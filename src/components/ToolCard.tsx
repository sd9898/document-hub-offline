import { Tool } from "@/types/tools";
import { cn } from "@/lib/utils";

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
        "tool-card group cursor-pointer text-left",
        categoryStyles[tool.category]
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl bg-secondary transition-colors duration-200 group-hover:bg-accent",
            iconStyles[tool.category]
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
            {tool.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {tool.description}
          </p>
        </div>
      </div>
    </button>
  );
}
