import { Tool } from "@/types/tools";
import { ToolCard } from "./ToolCard";

interface ToolSectionProps {
  title: string;
  tools: Tool[];
  onToolSelect: (tool: Tool) => void;
}

export function ToolSection({ title, tools, onToolSelect }: ToolSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-4 animate-fade-up">
        <h2 className="section-title flex-1">{title}</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {tools.map((tool, index) => (
          <div
            key={tool.id}
            style={{ animationDelay: `${index * 80}ms` }}
            className="animate-fade-up opacity-0"
          >
            <ToolCard tool={tool} onClick={() => onToolSelect(tool)} />
          </div>
        ))}
      </div>
    </section>
  );
}
