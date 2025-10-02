import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  isSearching: boolean;
  searchResults: any[];
  setSearchResults: (results: any[]) => void;
}

export const SearchModal = ({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  handleSearch,
  isSearching,
  searchResults,
  setSearchResults,
}: SearchModalProps) => {
  if (!isOpen) return null;

  return (
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
                onClose();
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
  );
};
