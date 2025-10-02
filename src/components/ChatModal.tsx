import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  chatInput: string;
  setChatInput: (input: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  languages: Language[];
  handleChatSubmit: (e: React.FormEvent) => void;
  startVoiceRecognition: () => void;
  isRecording: boolean;
  isSpeaking: boolean;
  speakText: (text: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const ChatModal = ({
  isOpen,
  onClose,
  messages,
  chatInput,
  setChatInput,
  selectedLanguage,
  setSelectedLanguage,
  languages,
  handleChatSubmit,
  startVoiceRecognition,
  isRecording,
  isSpeaking,
  speakText,
  messagesEndRef,
}: ChatModalProps) => {
  if (!isOpen) return null;

  return (
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
              onClick={onClose}
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
  );
};
