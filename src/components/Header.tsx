import { Boxes, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
}

export function Header({ showBack, onBack, title }: HeaderProps) {
  return (
    <header className="relative z-10 flex items-center gap-4 border-b border-border/50 px-8 py-5 glass">
      {showBack && onBack && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="shrink-0 hover:bg-primary/10 hover:text-primary"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      )}
      
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="relative">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[hsl(290_90%_55%)]">
            <Boxes className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-excel">
            <Sparkles className="h-3 w-3 text-background" />
          </div>
        </div>
        
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">
            {title || (
              <>
                Doc<span className="gradient-text">Toolbox</span>
              </>
            )}
          </h1>
          {!showBack && (
            <p className="text-sm text-muted-foreground">
              Desktop Document Processor
            </p>
          )}
        </div>
      </div>

      {/* Version badge */}
      {!showBack && (
        <div className="ml-auto">
          <span className="chip text-xs">
            v1.0.0 • Offline Mode
          </span>
        </div>
      )}
    </header>
  );
}
