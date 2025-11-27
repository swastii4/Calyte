import { Layout } from '@/components/Layout';
import { useTheme } from '@/contexts/ThemeContext';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Send, Mic, MicOff, MessageSquare, Volume2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Chat() {
  const { isDarkMode } = useTheme();
  const [mode, setMode] = useState<'text' | 'speech'>('text');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! I\'m your AI wellness companion. How are you feeling today? I\'m here to listen and provide support.',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const modeRef = useRef(mode);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        
        if (modeRef.current === 'speech') {
          setTimeout(() => {
            const speechInput = transcript;
            if (!speechInput.trim()) return;

            const userMessage: Message = {
              id: Date.now(),
              role: 'user',
              content: speechInput,
              timestamp: new Date(),
            };

            setMessages(prev => [...prev, userMessage]);
            setInput('');

            setTimeout(() => {
              const responses = [
                'I understand how you\'re feeling. Remember that it\'s okay to have difficult days. What specific situation is troubling you?',
                'Thank you for sharing that with me. Your feelings are valid. Have you tried any breathing exercises or meditation recently?',
                'I\'m here for you. It sounds like you\'re dealing with a lot. Would you like to talk about what\'s on your mind?',
                'That\'s a great insight. Recognizing your feelings is the first step toward understanding them better.',
                'I hear you. Sometimes it helps to take a moment to pause and breathe. How are you taking care of yourself today?',
              ];

              const aiMessage: Message = {
                id: Date.now() + 1,
                role: 'assistant',
                content: responses[Math.floor(Math.random() * responses.length)],
                timestamp: new Date(),
              };

              setMessages(prev2 => [...prev2, aiMessage]);
              speakMessage(aiMessage.content);
            }, 1000);
          }, 100);
        }
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');

    setTimeout(() => {
      const responses = [
        'I understand how you\'re feeling. Remember that it\'s okay to have difficult days. What specific situation is troubling you?',
        'Thank you for sharing that with me. Your feelings are valid. Have you tried any breathing exercises or meditation recently?',
        'I\'m here for you. It sounds like you\'re dealing with a lot. Would you like to talk about what\'s on your mind?',
        'That\'s a great insight. Recognizing your feelings is the first step toward understanding them better.',
        'I hear you. Sometimes it helps to take a moment to pause and breathe. How are you taking care of yourself today?',
      ];

      const aiMessage: Message = {
        id: messages.length + 2,
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);

      if (mode === 'speech') {
        speakMessage(aiMessage.content);
      }
    }, 1000);
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
      }
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-32">
        <div className="mb-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative w-32 h-32">
              <div 
                className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-yellow-300/80 via-orange-300/80 to-white/80' : 'bg-gradient-to-br from-yellow-400 via-orange-400 to-white'} 
                  transition-all duration-700 ease-in-out`}
                style={{
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  animation: 'rotateStar 8s linear infinite'
                }}
              />
            </div>
          </div>
          
          <h2 className={`${isDarkMode ? 'text-white/95' : 'text-slate-900'} font-serif text-4xl mb-4`}>
            AI Therapy Chat
          </h2>
          <p className={isDarkMode ? 'text-white/70' : 'text-slate-700'}>
            Your safe space for anonymous support
          </p>

          <div className="flex justify-center gap-3 mt-6">
            <Button
              onClick={() => setMode('text')}
              variant={mode === 'text' ? 'default' : 'outline'}
              className="gap-2"
              data-testid="button-mode-text"
            >
              <MessageSquare className="w-4 h-4" />
              Text Chat
            </Button>
            <Button
              onClick={() => {
                if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
                  alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
                  return;
                }
                setMode('speech');
              }}
              variant={mode === 'speech' ? 'default' : 'outline'}
              className="gap-2"
              data-testid="button-mode-speech"
            >
              <Volume2 className="w-4 h-4" />
              Voice Chat
            </Button>
          </div>
        </div>

        <Card className={`${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-900/10'} backdrop-blur-xl mb-4`}>
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                    message.role === 'user'
                      ? isDarkMode ? 'bg-primary/90 text-white' : 'bg-primary text-white'
                      : isDarkMode ? 'bg-white/10 text-white/90' : 'bg-slate-100 text-slate-900'
                  }`}
                  data-testid={`message-${message.id}`}
                >
                  {message.role === 'assistant' && (
                    <Badge variant="outline" className="text-xs mb-2">AI Counselor</Badge>
                  )}
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <span className={`text-xs mt-2 block ${message.role === 'user' ? 'text-white/70' : isDarkMode ? 'text-white/50' : 'text-slate-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className={`border-t ${isDarkMode ? 'border-white/10' : 'border-slate-900/10'} p-4`}>
            <div className="flex gap-3">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={mode === 'speech' ? 'Click the mic button to speak...' : 'Type your message...'}
                className={`${isDarkMode ? 'bg-white/5 border-white/10 text-white/90 placeholder:text-white/40' : 'bg-slate-50 border-slate-200 text-slate-900'} resize-none`}
                rows={2}
                data-testid="textarea-message"
              />
              <div className="flex flex-col gap-2">
                {mode === 'speech' && (
                  <>
                    <Button
                      onClick={toggleListening}
                      size="icon"
                      variant={isListening ? 'default' : 'outline'}
                      className={isListening ? 'animate-pulse' : ''}
                      data-testid="button-voice-input"
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                    {isSpeaking && (
                      <Button
                        onClick={stopSpeaking}
                        size="icon"
                        variant="outline"
                        data-testid="button-stop-speech"
                      >
                        <Volume2 className="w-4 h-4 text-red-500" />
                      </Button>
                    )}
                  </>
                )}
                <Button
                  onClick={handleSend}
                  size="icon"
                  disabled={!input.trim()}
                  data-testid="button-send"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <p className={`text-center text-sm ${isDarkMode ? 'text-white/50' : 'text-slate-500'}`}>
          Your conversations are private and anonymous. This AI provides support but is not a substitute for professional help.
        </p>
      </div>

      <style>{`
        @keyframes rotateStar {
          0%, 100% {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(90deg) scale(1.1);
          }
          50% {
            transform: rotate(180deg) scale(0.9);
          }
          75% {
            transform: rotate(270deg) scale(1.1);
          }
        }
      `}</style>
    </Layout>
  );
}
