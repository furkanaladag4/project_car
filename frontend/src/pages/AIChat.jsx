import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, Send } from 'lucide-react';
import axios from 'axios';

const AIChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (messages.length === 0 && user) {
      setMessages([{ role: 'ai', content: `Merhaba ${user.name}! Araba hakkında sorularınızı sorabilirsiniz. Örneğin, 'Toyota Corolla'nın özellikleri nelerdir?'` }]);
    }
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [user]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/chat', { prompt: input });
      const aiResponse = response.data.response;
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    } catch (error) {
      console.error('API hatası:', error);
      setMessages(prev => [...prev, { role: 'ai', content: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col font-sans">
      <header className="bg-automotive-navy text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center">
          <MessageSquare className="mr-2 h-6 w-6" />
          <h2 className="text-2xl font-bold">AI Chat</h2>
        </div>
      </header>
      <main className="flex-1 p-6 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto bg-white/90 rounded-xl shadow-2xl p-4 mb-4 custom-scrollbar">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 p-3 rounded-lg max-w-[80%] transform transition-all duration-200 ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-automotive-red to-red-600 text-white ml-auto animate-slideInRight'
                  : 'bg-gray-100 text-gray-800 animate-slideInLeft'
              }`}
            >
              {message.content}
            </div>
          ))}
          <div ref={chatEndRef} />
          {isLoading && (
            <div className="mb-4 p-3 bg-gray-100 text-gray-600 rounded-lg max-w-[80%] animate-pulse">
              Yanıt hazırlanıyor...
            </div>
          )}
        </div>
        <div className="bg-white/90 rounded-xl shadow-2xl p-4">
          <div className="flex space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-automotive-red focus:border-transparent placeholder-gray-400 transition-all duration-200"
              placeholder="Mesajınızı yazın..."
              disabled={!user}
            />
            <button
              onClick={handleSend}
              className="p-3 bg-gradient-to-r from-automotive-red to-red-600 text-white rounded-lg hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-automotive-red transition-all duration-200 disabled:opacity-50"
              disabled={!user || isLoading}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          {!user && (
            <p className="text-red-500 text-sm mt-2 text-center">
              Lütfen önce giriş yapın: <a href="/login" className="underline font-medium">Giriş</a>
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AIChat;