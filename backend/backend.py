from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM
import torch
import os
import uvicorn # <-- Bu import satırı EKLENDİ

app = FastAPI()

# CORS ayarları - Düzeltildi!
app.add_middleware(
    CORSMiddleware,
    # Frontend'inizin çalıştığı portu (5173) buraya ekledik.
    # Eğer başka bir port kullanırsanız, onu da eklemeniz gerekir.
    allow_origins=["http://localhost:3000", "http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model ve tokenizer yükleme
model_path = "./trained_model"

try:
    tokenizer = AutoTokenizer.from_pretrained(model_path, trust_remote_code=True)
    model = AutoModelForCausalLM.from_pretrained(
        model_path,
        torch_dtype=torch.float16,
        device_map="cpu",  # CPU'da çalıştır
        trust_remote_code=True
    )
    model.config.use_cache = True
    print("Model CPU'da yüklendi.")
except Exception as e:
    print(f"Model yüklenirken hata: {e}")
    # Hata durumunda uygulamanın tamamen kapanması yerine,
    # bir uyarı verip model olmadan devam etme veya daha iyi hata yönetimi düşünülebilir.
    # Ancak şimdilik mevcut davranışı koruyoruz.
    exit(1)

# Pipeline oluşturma
generator = pipeline(
    'text-generation',
    model=model,
    tokenizer=tokenizer,
    # device=0 # CPU kullanıldığında bu satıra gerek yoktur, hatta hata verebilir
)

# İstek ve yanıt modelleri
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
    # Eğer AI cevabı içinde tekrar 'User:' veya 'AI:' geçiyorsa, onu kes.
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
        # Detaylı hatayı loglamak iyi bir pratik olabilir.
        print(f"Yanıt üretilirken API hatası: {e}")
        raise HTTPException(status_code=500, detail=f"Yanıt üretilirken hata: {e}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)