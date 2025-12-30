import { Tool } from "@/types/tools";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
}

const categoryStyles: Record<string, string> = {
  pdf: "tool-card-pdf",
  word: "tool-card-word",
  excel: "tool-card-excel",
  powerpoint: "tool-card-powerpoint",
  image: "tool-card-image",
};

const iconStyles: Record<string, string> = {
  pdf: "icon-pdf",
  word: "icon-word",
  excel: "icon-excel",
  powerpoint: "icon-powerpoint",
  image: "icon-image",
};

export function ToolCard({ tool, onClick }: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <button
      onClick={onClick}
      className={cn(
        "tool-card group cursor-pointer text-left w-full",
        categoryStyles[tool.category]
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white transition-transform duration-300 group-hover:scale-110",
            iconStyles[tool.category]
          )}
        >
          <Icon className="h-7 w-7" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
              {tool.name}
            </h3>
            <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
          </div>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            {tool.description}
          </p>
          
          {/* Format chips */}
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
              {tool.inputFormats.join(", ").toUpperCase()}
            </span>
            <span className="text-xs text-muted-foreground">→</span>
            <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {tool.outputFormat}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
