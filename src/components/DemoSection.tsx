import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface DemoSectionProps {
  setIsChatOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
}

export const DemoSection = ({ setIsChatOpen, setIsSearchOpen }: DemoSectionProps) => {
  return (
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
  );
};
