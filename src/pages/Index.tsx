import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    if (!isListening) {
      const utterance = new SpeechSynthesisUtterance('Привет! Я Аиси, чем могу помочь?');
      utterance.lang = 'ru-RU';
      utterance.pitch = 1.2;
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
    }
  };

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
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Mic" size={20} className="text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Aisi
            </span>
          </div>
          <div className="hidden md:flex gap-6">
            {['Главная', 'Возможности', 'Демо', 'API', 'Контакты'].map((item, idx) => {
              const id = ['home', 'features', 'demo', 'api', 'contacts'][idx];
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

            <form onSubmit={handleSearch} className="w-full max-w-2xl">
              <div className="relative">
                <Icon
                  name="Search"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={20}
                />
                <Input
                  type="text"
                  placeholder="Поиск в интернете или голосовая команда..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg bg-card border-border rounded-2xl focus:ring-2 focus:ring-primary"
                />
              </div>
            </form>
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

      <section id="demo" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Попробуйте Демо</h2>
          <Card className="bg-gradient-to-br from-card to-card/50 border-border">
            <CardContent className="pt-8">
              <div className="space-y-6">
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

                <div className="text-center pt-4">
                  <Button
                    size="lg"
                    onClick={toggleVoice}
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
                  >
                    <Icon name="Play" size={20} className="mr-2" />
                    Начать разговор
                  </Button>
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

      <section id="contacts" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Свяжитесь с нами</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Готовы интегрировать Aisi в ваш проект? Напишите нам!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-white">
              <Icon name="Mail" size={20} className="mr-2" />
              info@aisi.dev
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Telegram
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Icon name="Github" size={20} className="mr-2" />
              GitHub
            </Button>
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
