import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface NavigationProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsChatOpen: (open: boolean) => void;
  messagesCount: number;
}

export const Navigation = ({
  activeSection,
  scrollToSection,
  setIsSearchOpen,
  setIsChatOpen,
  messagesCount,
}: NavigationProps) => {
  const navItems = ['Главная', 'Возможности', 'Демо', 'API'];
  const navIds = ['home', 'features', 'demo', 'api'];

  return (
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
              onClick={() => setIsSearchOpen(true)}
              variant="ghost"
              size="sm"
              className="rounded-full w-10 h-10 p-0 hover:bg-primary/10 relative"
            >
              <Icon name="HelpCircle" size={22} className="text-primary" />
            </Button>
            <Button
              onClick={() => setIsChatOpen(true)}
              className="relative bg-gradient-to-br from-primary to-secondary text-white hover:opacity-90 rounded-full w-10 h-10 p-0"
            >
              <Icon name="MessageCircle" size={20} />
              {messagesCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center animate-pulse">
                  {messagesCount}
                </div>
              )}
            </Button>
          </div>
        </div>
        <div className="hidden md:flex gap-6">
          {navItems.map((item, idx) => {
            const id = navIds[idx];
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
  );
};
