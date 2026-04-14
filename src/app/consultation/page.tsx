'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ConsultationPage() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Initial greeting
  useEffect(() => {
    if (!initialized) {
      const greeting = language === 'zh'
        ? '您好！我是 Nexus Care AI 导诊助手。请描述您的症状或不适，我会为您推荐合适的科室。\n\n常见症状如：头痛、发烧、咳嗽、腹痛、胸闷等。'
        : 'Hello! I am the Nexus Care AI consultation assistant. Please describe your symptoms or discomfort, and I will recommend the appropriate department.\n\nCommon symptoms: headache, fever, cough, abdominal pain, chest tightness, etc.';
      
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: greeting,
          timestamp: new Date(),
        },
      ]);
      setInitialized(true);
    }
  }, [language, initialized]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsStreaming(true);

    // Add placeholder for AI response
    const aiMessageId = (Date.now() + 1).toString();
    setMessages(prev => [
      ...prev,
      {
        id: aiMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      },
    ]);

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage.content },
          ],
          language,
        }),
      });

      if (!response.ok) throw new Error('Request failed');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.content) {
                  fullContent += data.content;
                  setMessages(prev =>
                    prev.map(msg =>
                      msg.id === aiMessageId
                        ? { ...msg, content: fullContent }
                        : msg
                    )
                  );
                }
              } catch {
                // Skip invalid JSON
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === aiMessageId
            ? {
                ...msg,
                content: language === 'zh'
                  ? '抱歉，服务暂时不可用，请稍后再试。'
                  : 'Sorry, the service is temporarily unavailable. Please try again later.',
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetConversation = () => {
    setMessages([]);
    const greeting = language === 'zh'
      ? '您好！我是 Nexus Care AI 导诊助手。请描述您的症状或不适，我会为您推荐合适的科室。\n\n常见症状如：头痛、发烧、咳嗽、腹痛、胸闷等。'
      : 'Hello! I am the Nexus Care AI consultation assistant. Please describe your symptoms or discomfort, and I will recommend the appropriate department.\n\nCommon symptoms: headache, fever, cough, abdominal pain, chest tightness, etc.';
    
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: greeting,
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)]">
      {/* Header */}
      <Card className="mb-4 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">{t.consultation.title}</CardTitle>
                <p className="text-sm text-gray-500">{t.consultation.subtitle}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetConversation}
              className="text-gray-500"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              {language === 'zh' ? '重新开始' : 'Reset'}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Emergency Notice */}
      <Card className="mb-4 bg-red-50 border-red-200">
        <CardContent className="flex items-center gap-2 py-2 text-red-700">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{t.consultation.emergencyTip}</span>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea ref={scrollRef} className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user'
                      ? 'bg-blue-500'
                      : 'bg-gray-200'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 whitespace-pre-wrap ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.content}
                  {message.id === messages[messages.length - 1]?.id && 
                   isStreaming && (
                    <span className="inline-block ml-1 animate-pulse">▊</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t p-4 bg-white">
          <div className="flex gap-2">
            <Textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.consultation.chatPlaceholder}
              className="min-h-[44px] max-h-[120px] resize-none"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="h-auto px-4 bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            {language === 'zh'
              ? '此服务仅供参考，不能替代专业医疗建议'
              : 'This service is for reference only and cannot replace professional medical advice'}
          </p>
        </div>
      </Card>
    </div>
  );
}
