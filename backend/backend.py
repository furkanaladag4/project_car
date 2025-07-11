from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM
import torch
import os
import uvicorn

app = FastAPI()

# CORS ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model ve tokenizer yükleme
model_path = "./trained_model"

try:
    # Cihazı belirleme: CUDA (GPU) varsa 'cuda', yoksa 'cpu' kullan
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Model {device.upper()}'da yüklenecek.")

    tokenizer = AutoTokenizer.from_pretrained(model_path, trust_remote_code=True)
    model = AutoModelForCausalLM.from_pretrained(
        model_path,
        torch_dtype=torch.float16,
        device_map=device,  # <-- Burayı DÜZELTTİK: Cihazı otomatik algıla veya 'cuda' olarak ayarla
        trust_remote_code=True
    )
    model.config.use_cache = True
    print(f"Model {device.upper()}'da yüklendi.")

except Exception as e:
    print(f"Model yüklenirken hata: {e}")
    exit(1)

# Pipeline oluşturma
generator = pipeline(
    'text-generation',
    model=model,
    tokenizer=tokenizer,
    device=0 if device == "cuda" else -1 # <-- Burayı DÜZELTTİK: GPU için 0, CPU için -1
)

# İstek ve yanıt modelleri (mevcut haliyle kalabilir)
class ChatRequest(BaseModel):
    prompt: str

class ChatResponse(BaseModel):
    response: str

def generate_response(prompt_text: str) -> str:
    formatted_prompt = f"User: {prompt_text}\nAI:"
    output = generator(
        formatted_prompt,
        max_new_tokens=100,
        num_return_sequences=1,
        do_sample=True,
        top_k=50,
        top_p=0.95,
        temperature=0.7,
        repetition_penalty=1.2,
        pad_token_id=tokenizer.eos_token_id
    )
    generated_text = output[0]['generated_text']
    response = generated_text.split("AI:", 1)[1].strip() if "AI:" in generated_text else generated_text.strip()
    if "\nUser:" in response:
        response = response.split("\nUser:")[0].strip()
    if "\nAI:" in response:
        response = response.split("\nAI:")[0].strip()
    return response

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        response = generate_response(request.prompt)
        return ChatResponse(response=response)
    except Exception as e:
        print(f"Yanıt üretilirken API hatası: {e}")
        raise HTTPException(status_code=500, detail=f"Yanıt üretilirken hata: {e}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)