import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: "Hello! I'm your automotive AI assistant. I can help you with car specifications, comparisons, recommendations, and answer any questions about vehicles. What would you like to know?",
      isUser: false,
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('tesla')) {
      return "Tesla is a leader in electric vehicles! Their Model S Plaid can accelerate from 0-60 mph in just 1.99 seconds. Would you like to know more about Tesla's lineup or compare it with other electric vehicles?";
    } else if (lowerMessage.includes('bmw') || lowerMessage.includes('mercedes')) {
      return "Both BMW and Mercedes-Benz are premium German automakers known for luxury and performance. BMW focuses on 'The Ultimate Driving Machine' with sporty handling, while Mercedes emphasizes luxury and comfort. What specific models are you interested in comparing?";
    } else if (lowerMessage.includes('electric') || lowerMessage.includes('ev')) {
      return "Electric vehicles are the future! They offer instant torque, lower running costs, and zero emissions. Popular EVs include Tesla Model S, BMW iX, Mercedes EQS, and Ford F-150 Lightning. What's your budget range and intended use?";
    } else if (lowerMessage.includes('sports car') || lowerMessage.includes('performance')) {
      return "Sports cars offer thrilling performance! Some top choices include the Porsche 911 Turbo S (640 HP), Mercedes-AMG GT (523 HP), and BMW M8 Competition. Are you looking for track-focused performance or daily-drivable sports cars?";
    } else if (lowerMessage.includes('suv')) {
      return "SUVs provide great versatility! Popular options include luxury SUVs like BMW X7, Mercedes GLS, and Audi Q8, or more practical choices. What size SUV are you considering and what features are most important to you?";
    } else if (lowerMessage.includes('budget') || lowerMessage.includes('cheap') || lowerMessage.includes('affordable')) {
      return "There are great affordable options! For reliable, budget-friendly cars, consider Honda Civic, Toyota Corolla, or Nissan Sentra. What's your price range and what type of vehicle do you need?";
    } else if (lowerMessage.includes('compare')) {
      return "I'd be happy to help you compare vehicles! Please tell me which specific car models you'd like to compare, and I'll provide detailed specifications, performance data, and recommendations based on your needs.";
    } else {
      return "That's an interesting question about cars! I have extensive knowledge about vehicle specifications, performance, safety ratings, and market trends. Could you be more specific about what you'd like to know? I can help with comparisons, recommendations, or detailed information about any car model.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !isAuthenticated) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage,
      isUser: true,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: simulateAIResponse(inputMessage),
        isUser: false,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
          <p className="text-gray-600 mb-6">Please log in to access our AI chat assistant.</p>
          <a href="/login" className="bg-gradient-red text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-red p-2 rounded-full">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-automotive-navy">AI Car Assistant</h1>
              <p className="text-sm text-gray-600">Get expert automotive advice powered by AI</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex space-x-3 max-w-xs lg:max-w-md ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`flex-shrink-0 ${message.isUser ? 'bg-automotive-navy' : 'bg-gradient-red'} rounded-full p-2`}>
                    {message.isUser ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      message.isUser
                        ? 'bg-automotive-navy text-white'
                        : 'bg-white text-gray-900 shadow-md'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <span className={`text-xs mt-1 block ${message.isUser ? 'text-gray-300' : 'text-gray-500'}`}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex space-x-3 max-w-xs lg:max-w-md">
                  <div className="bg-gradient-red rounded-full p-2">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-white text-gray-900 shadow-md px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white border-t px-6 py-4">
          <div className="flex space-x-3">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about cars..."
              className="flex-1 resize-none border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-automotive-red focus:border-transparent"
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-gradient-red text-white p-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;