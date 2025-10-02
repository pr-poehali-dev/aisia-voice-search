import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export const FeaturesSection = () => {
  const features = [
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
  ];

  return (
    <section id="features" className="py-20 px-4 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-12">Возможности</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
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
  );
};
