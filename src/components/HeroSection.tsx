import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  isListening: boolean;
  toggleVoice: () => void;
}

const WaveBar = ({ delay }: { delay: number }) => (
  <div
    className="w-1 bg-gradient-to-t from-primary to-secondary rounded-full animate-pulse-wave"
    style={{
      height: '40px',
      animationDelay: `${delay}ms`,
    }}
  />
);

export const HeroSection = ({ isListening, toggleVoice }: HeroSectionProps) => {
  return (
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
  );
};
