import { Tool } from "@/types/tools";
import { Header } from "@/components/Header";
import { ToolSection } from "@/components/ToolSection";
import { pdfTools, convertToPdfTools, convertFromPdfTools } from "@/data/tools";

interface HomeProps {
  onToolSelect: (tool: Tool) => void;
}

export function Home({ onToolSelect }: HomeProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 px-8 py-10">
        <div className="mx-auto max-w-7xl space-y-12">
          {/* Hero Section */}
          <div className="text-center animate-fade-up">
            <h2 className="text-4xl font-bold text-foreground">
              All-in-One Document Tools
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Process PDFs, convert documents, and manage files — completely
              offline
            </p>
          </div>

          {/* Tool Sections */}
          <ToolSection
            title="PDF Tools"
            tools={pdfTools}
            onToolSelect={onToolSelect}
          />

          <ToolSection
            title="Convert to PDF"
            tools={convertToPdfTools}
            onToolSelect={onToolSelect}
          />

          <ToolSection
            title="Convert from PDF"
            tools={convertFromPdfTools}
            onToolSelect={onToolSelect}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-8 py-6">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm text-muted-foreground">
            🔒 All processing happens locally on your computer. Your files never
            leave your device.
          </p>
        </div>
      </footer>
    </div>
  );
}
