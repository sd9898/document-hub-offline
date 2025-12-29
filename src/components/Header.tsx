import { FileText, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
}

export function Header({ showBack, onBack, title }: HeaderProps) {
  return (
    <header className="flex items-center gap-4 border-b border-border bg-card/50 px-8 py-4 backdrop-blur-sm">
      {showBack && onBack && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      )}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">
            {title || "Document Toolbox"}
          </h1>
          {!showBack && (
            <p className="text-sm text-muted-foreground">
              Desktop Document Processor
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
