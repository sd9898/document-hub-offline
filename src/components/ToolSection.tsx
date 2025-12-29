import { Tool } from "@/types/tools";
import { ToolCard } from "./ToolCard";

interface ToolSectionProps {
  title: string;
  tools: Tool[];
  onToolSelect: (tool: Tool) => void;
}

export function ToolSection({ title, tools, onToolSelect }: ToolSectionProps) {
  return (
    <section className="animate-fade-up">
      <h2 className="section-title mb-6">{title}</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {tools.map((tool, index) => (
          <div
            key={tool.id}
            style={{ animationDelay: `${index * 50}ms` }}
            className="animate-fade-up"
          >
            <ToolCard tool={tool} onClick={() => onToolSelect(tool)} />
          </div>
        ))}
      </div>
    </section>
  );
}
