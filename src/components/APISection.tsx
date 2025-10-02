import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export const APISection = () => {
  return (
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
  );
};
