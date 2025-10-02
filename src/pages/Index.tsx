import { useState, useRef, useEffect } from 'react';
import { Message } from '@/components/ChatModal';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { SearchModal } from '@/components/SearchModal';
import { ChatModal } from '@/components/ChatModal';
import { DemoSection } from '@/components/DemoSection';
import { APISection } from '@/components/APISection';

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

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <Navigation
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        setIsSearchOpen={setIsSearchOpen}
        setIsChatOpen={setIsChatOpen}
        messagesCount={messages.length}
      />

      <HeroSection isListening={isListening} toggleVoice={toggleVoice} />

      <FeaturesSection />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        isSearching={isSearching}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
      />

      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        messages={messages}
        chatInput={chatInput}
        setChatInput={setChatInput}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        languages={languages}
        handleChatSubmit={handleChatSubmit}
        startVoiceRecognition={startVoiceRecognition}
        isRecording={isRecording}
        isSpeaking={isSpeaking}
        speakText={speakText}
        messagesEndRef={messagesEndRef}
      />

      <DemoSection setIsChatOpen={setIsChatOpen} setIsSearchOpen={setIsSearchOpen} />

      <APISection />

      <footer className="py-8 px-4 border-t border-border bg-card/50">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 Aisi. Интеллектуальный голосовой ассистент нового поколения.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
