import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Index = () => {
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('ru-RU');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    if (!isListening) {
      const greetings: Record<string, string> = {
        'ru-RU': 'Привет! Я Аиси, чем могу помочь?',
        'en-US': 'Hello! I am Aisi, how can I help you?',
        'pt-BR': 'Olá! Eu sou Aisi, como posso ajudar?',
        'fr-FR': 'Bonjour! Je suis Aisi, comment puis-je vous aider?',
        'es-ES': '¡Hola! Soy Aisi, ¿cómo puedo ayudarte?',
        'de-DE': 'Hallo! Ich bin Aisi, wie kann ich helfen?',
        'it-IT': 'Ciao! Sono Aisi, come posso aiutarti?',
        'ja-JP': 'こんにちは！私はAisiです。どうお手伝いできますか？',
        'zh-CN': '你好！我是Aisi，我能帮您什么？',
      };
      speakText(greetings[selectedLanguage] || greetings['ru-RU']);
    } else {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const languages = [
    { code: 'ru-RU', name: 'Русский', flag: '🇷🇺' },
    { code: 'en-US', name: 'English', flag: '🇺🇸' },
    { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
    { code: 'fr-FR', name: 'Français', flag: '🇫🇷' },
    { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
    { code: 'de-DE', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it-IT', name: 'Italiano', flag: '🇮🇹' },
    { code: 'ja-JP', name: '日本語', flag: '🇯🇵' },
    { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      setTimeout(() => {
        setSearchResults([
          { title: `Результаты по запросу "${searchQuery}"`, snippet: 'Информация найдена в интернете. Aisi анализирует данные для вас...' },
          { title: 'Связанные темы', snippet: 'Дополнительная информация и рекомендации на основе вашего запроса.' },
        ]);
        setIsSearching(false);
      }, 1000);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage;
      utterance.pitch = 1.2;
      utterance.rate = 0.9;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Ваш браузер не поддерживает распознавание речи. Попробуйте Chrome.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = selectedLanguage;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setChatInput(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage: Message = { role: 'user', content: chatInput };
    setMessages(prev => [...prev, userMessage]);

    const responses: Record<string, string> = {
      'ru-RU': `Я Аиси, ваш голосовой помощник. Вы написали: "${chatInput}". Чем могу помочь?`,
      'en-US': `I'm Aisi, your voice assistant. You wrote: "${chatInput}". How can I help?`,
      'pt-BR': `Sou Aisi, sua assistente de voz. Você escreveu: "${chatInput}". Como posso ajudar?`,
      'fr-FR': `Je suis Aisi, votre assistante vocale. Vous avez écrit: "${chatInput}". Comment puis-je vous aider?`,
      'es-ES': `Soy Aisi, tu asistente de voz. Escribiste: "${chatInput}". ¿Cómo puedo ayudarte?`,
      'de-DE': `Ich bin Aisi, Ihre Sprachassistentin. Sie schrieben: "${chatInput}". Wie kann ich helfen?`,
      'it-IT': `Sono Aisi, la tua assistente vocale. Hai scritto: "${chatInput}". Come posso aiutarti?`,
      'ja-JP': `私はAisiです、あなたの音声アシスタント。「${chatInput}」と書きました。どうお手伝いできますか？`,
      'zh-CN': `我是Aisi，您的语音助手。您写道："${chatInput}"。我能帮您什么？`,
    };

    setTimeout(() => {
      const assistantMessage: Message = {
        role: 'assistant',
        content: responses[selectedLanguage] || responses['ru-RU'],
      };
      setMessages(prev => [...prev, assistantMessage]);
      speakText(assistantMessage.content);
    }, 500);

    setChatInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const WaveBar = ({ delay }: { delay: number }) => (
    <div
      className="w-1 bg-gradient-to-t from-primary to-secondary rounded-full animate-pulse-wave"
      style={{
        height: '40px',
        animationDelay: `${delay}ms`,
      }}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <nav className="fixed top-0 w-full z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Mic" size={20} className="text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Aisi
            </span>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                variant="ghost"
                size="sm"
                className="rounded-full w-10 h-10 p-0 hover:bg-primary/10 relative"
              >
                <Icon name="HelpCircle" size={22} className="text-primary" />
              </Button>
              <Button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="relative bg-gradient-to-br from-primary to-secondary text-white hover:opacity-90 rounded-full w-10 h-10 p-0"
              >
                <Icon name="MessageCircle" size={20} />
                {messages.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center animate-pulse">
                    {messages.length}
                  </div>
                )}
              </Button>
            </div>
          </div>
          <div className="hidden md:flex gap-6">
            {['Главная', 'Возможности', 'Демо', 'API'].map((item, idx) => {
              const id = ['home', 'features', 'demo', 'api'][idx];
              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              AI Голосовой Ассистент
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
              Aisi
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Интеллектуальный голосовой помощник с женским мягким голосом. Управляйте поиском и получайте ответы через голосовые команды.
            </p>
          </div>

          <div className="flex flex-col items-center gap-8 mb-12">
            <div className="relative">
              <Button
                size="lg"
                onClick={toggleVoice}
                className={`w-32 h-32 rounded-full text-white transition-all duration-300 ${
                  isListening
                    ? 'bg-gradient-to-br from-primary to-secondary scale-110 shadow-2xl shadow-primary/50'
                    : 'bg-gradient-to-br from-primary/80 to-secondary/80 hover:scale-105'
                }`}
              >
                <Icon name={isListening ? 'MicOff' : 'Mic'} size={48} />
              </Button>
              {isListening && (
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary to-secondary opacity-30 animate-ping" />
              )}
            </div>

            {isListening && (
              <div className="flex gap-1 items-center h-16">
                {[0, 100, 200, 300, 400, 300, 200, 100, 0].map((delay, idx) => (
                  <WaveBar key={idx} delay={delay} />
                ))}
              </div>
            )}

            <div className="w-full max-w-2xl">
              <div className="text-center text-muted-foreground mb-4">
                <p className="text-lg">Используйте кнопку поиска ❓ в навигации для интеллектуального поиска</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">Возможности</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: 'Mic',
                title: 'Голосовое управление',
                desc: 'Активация по команде, как у Алисы. Женский мягкий голос для комфортного общения.',
              },
              {
                icon: 'Globe',
                title: 'Поиск в интернете',
                desc: 'Мгновенный доступ к информации из сети через голос или текстовый запрос.',
              },
              {
                icon: 'Zap',
                title: 'Быстрые ответы',
                desc: 'Интеллектуальная обработка запросов с использованием современного AI.',
              },
              {
                icon: 'MessageSquare',
                title: 'Естественный диалог',
                desc: 'Понимание контекста и ведение полноценного разговора на русском языке.',
              },
              {
                icon: 'Shield',
                title: 'Приватность',
                desc: 'Обработка запросов с соблюдением конфиденциальности ваших данных.',
              },
              {
                icon: 'Sparkles',
                title: 'Умные подсказки',
                desc: 'Автоматические рекомендации и предложения на основе ваших запросов.',
              },
            ].map((feature, idx) => (
              <Card
                key={idx}
                className="bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                    <Icon name={feature.icon as any} size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-3xl bg-card border-border shadow-2xl animate-scale-in max-h-[90vh] overflow-hidden flex flex-col">
            <CardContent className="pt-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Icon name="Search" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Поиск с Aisi</h3>
                    <p className="text-sm text-muted-foreground">Интеллектуальный поиск по интернету</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchResults([]);
                    setSearchQuery('');
                  }}
                  className="rounded-full"
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>

              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <Icon
                    name="Search"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={20}
                  />
                  <Input
                    type="text"
                    placeholder="Введите поисковый запрос..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-6 text-lg bg-muted border-border rounded-2xl focus:ring-2 focus:ring-primary"
                    autoFocus
                  />
                </div>
              </form>

              {isSearching && (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin mb-4">
                    <Icon name="Loader2" size={40} className="text-primary" />
                  </div>
                  <p className="text-primary">Aisi ищет информацию в интернете...</p>
                </div>
              )}

              {!isSearching && searchResults.length > 0 && (
                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="Sparkles" size={20} className="text-primary" />
                    <p className="text-sm text-muted-foreground">
                      Найдено {searchResults.length} результатов по запросу "{searchQuery}"
                    </p>
                  </div>
                  
                  {searchResults.map((result, idx) => (
                    <Card key={idx} className="bg-gradient-to-br from-card to-card/50 border-border hover:border-primary/50 transition-all">
                      <CardContent className="pt-4">
                        <div className="flex gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                            <Icon name="Globe" size={20} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-primary mb-2">{result.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{result.snippet}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <div className="sticky bottom-0 pt-4 bg-card">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchResults([]);
                        setSearchQuery('');
                      }}
                      className="w-full border-border hover:bg-primary/10"
                    >
                      <Icon name="RotateCcw" size={16} className="mr-2" />
                      Новый поиск
                    </Button>
                  </div>
                </div>
              )}

              {!isSearching && searchResults.length === 0 && searchQuery === '' && (
                <div className="text-center py-20 text-muted-foreground">
                  <Icon name="Search" size={64} className="mx-auto mb-4 opacity-30" />
                  <p className="text-lg">Введите запрос для поиска</p>
                  <p className="text-sm mt-2">Aisi найдёт для вас актуальную информацию</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {isChatOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl bg-card border-border shadow-2xl animate-scale-in">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Icon name="Bot" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Чат с Aisi</h3>
                    <p className="text-sm text-muted-foreground">Голосовой AI-ассистент</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsChatOpen(false)}
                  className="rounded-full"
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>

              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={selectedLanguage === lang.code ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedLanguage(lang.code)}
                    className={`flex-shrink-0 ${selectedLanguage === lang.code ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'border-border'}`}
                  >
                    <span className="mr-1">{lang.flag}</span>
                    {lang.name}
                  </Button>
                ))}
              </div>

              <div className="h-96 overflow-y-auto mb-4 space-y-4 px-2 bg-background/50 rounded-2xl p-4">
                {messages.length === 0 && (
                  <div className="text-center text-muted-foreground py-20">
                    <Icon name="MessageCircle" size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Начните диалог с Aisi на выбранном языке</p>
                    <p className="text-sm mt-2">Используйте микрофон для голосового ввода</p>
                  </div>
                )}
                
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 animate-fade-in ${msg.role === 'assistant' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                      <Icon name={msg.role === 'user' ? 'User' : 'Bot'} size={20} className="text-white" />
                    </div>
                    <div className="flex-1 max-w-[80%]">
                      <div
                        className={`rounded-2xl p-4 ${
                          msg.role === 'user'
                            ? 'bg-muted rounded-tl-none'
                            : 'bg-gradient-to-br from-primary/20 to-secondary/20 rounded-tr-none border border-primary/30'
                        }`}
                      >
                        <p className="text-foreground break-words">{msg.content}</p>
                      </div>
                    </div>
                    {msg.role === 'assistant' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => speakText(msg.content)}
                        className="mt-2 flex-shrink-0"
                      >
                        <Icon name={isSpeaking ? 'Volume2' : 'VolumeX'} size={16} />
                      </Button>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  onClick={startVoiceRecognition}
                  className={`rounded-2xl border-border ${
                    isRecording ? 'bg-red-500/20 border-red-500' : ''
                  }`}
                >
                  <Icon name={isRecording ? 'MicOff' : 'Mic'} size={20} className={isRecording ? 'text-red-500' : ''} />
                </Button>
                <Input
                  type="text"
                  placeholder="Напишите сообщение или используйте микрофон..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-muted border-border rounded-2xl"
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={!chatInput.trim()}
                  className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl disabled:opacity-50"
                >
                  <Icon name="Send" size={20} />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <section id="demo" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-8">Интерактивные возможности</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-card to-card/50 border-border hover:border-primary/50 transition-all cursor-pointer" onClick={() => setIsChatOpen(true)}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Icon name="MessageCircle" size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Чат с Aisi</h3>
                    <p className="text-sm text-muted-foreground">Голосовой AI-ассистент</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Общайтесь с Aisi на 9 языках с голосовым озвучиванием и распознаванием речи
                </p>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white">
                  <Icon name="MessageSquare" size={18} className="mr-2" />
                  Открыть чат
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-card/50 border-border hover:border-primary/50 transition-all cursor-pointer" onClick={() => setIsSearchOpen(true)}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                    <Icon name="Search" size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Умный поиск</h3>
                    <p className="text-sm text-muted-foreground">Поиск в интернете</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Интеллектуальный поиск информации с помощью AI без перехода на другие сайты
                </p>
                <Button className="w-full bg-gradient-to-r from-secondary to-primary text-white">
                  <Icon name="Search" size={18} className="mr-2" />
                  Начать поиск
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-card to-card/50 border-border mt-6">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4 text-center">Пример диалога</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <Icon name="User" size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-muted rounded-2xl rounded-tl-none p-4">
                      <p className="text-foreground">Привет, Aisi! Как погода сегодня?</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 flex-row-reverse">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center flex-shrink-0">
                    <Icon name="Bot" size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl rounded-tr-none p-4 border border-primary/30">
                      <p className="text-foreground">
                        Сейчас проверю погоду для вас. В вашем регионе ожидается солнечная погода, температура +22°C. Отличный день для прогулки!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="api" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">API для разработчиков</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Icon name="Code" size={20} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">REST API</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Интегрируйте Aisi в ваши приложения через простой REST API. Полная документация и примеры кода.
                </p>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                  <code className="text-primary">POST /api/voice</code>
                  <br />
                  <code className="text-muted-foreground">
                    {`{ "query": "поиск" }`}
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                    <Icon name="Webhook" size={20} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">WebSocket</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Подключение в реальном времени для потоковой передачи голоса и мгновенных ответов.
                </p>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                  <code className="text-primary">wss://api.aisi.dev</code>
                  <br />
                  <code className="text-muted-foreground">/voice-stream</code>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border bg-card/50">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 Aisi. Интеллектуальный голосовой ассистент нового поколения.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;