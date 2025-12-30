import { Tool } from "@/types/tools";
import { Header } from "@/components/Header";
import { ToolSection } from "@/components/ToolSection";
import { pdfTools, convertToPdfTools, convertFromPdfTools } from "@/data/tools";
import { Sparkles, Shield, Zap } from "lucide-react";

interface HomeProps {
  onToolSelect: (tool: Tool) => void;
}

export function Home({ onToolSelect }: HomeProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-mesh pointer-events-none" />
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      
      {/* Floating Orbs */}
      <div className="orb orb-purple w-[500px] h-[500px] -top-48 -left-48 animate-float" />
      <div className="orb orb-blue w-[400px] h-[400px] top-1/4 -right-32 animate-float" style={{ animationDelay: '-2s' }} />
      <div className="orb orb-pink w-[300px] h-[300px] bottom-20 left-1/4 animate-float" style={{ animationDelay: '-4s' }} />

      <Header />

      <main className="relative flex-1 px-8 py-12">
        <div className="mx-auto max-w-7xl space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-6 animate-fade-up">
            <div className="inline-flex items-center gap-2 chip chip-primary mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>100% Offline • No Limits • Free Forever</span>
            </div>
            
            <h2 className="text-5xl font-bold font-display">
              <span className="text-foreground">Your Complete</span>{" "}
              <span className="gradient-text">Document Toolkit</span>
            </h2>
            
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Process PDFs, convert documents, and manage files with powerful desktop tools.
              Everything runs locally — your files never leave your computer.
            </p>

            {/* Feature Pills */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pdf/10">
                  <Shield className="h-4 w-4 text-pdf" />
                </div>
                <span>Private & Secure</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-excel/10">
                  <Zap className="h-4 w-4 text-excel" />
                </div>
                <span>Lightning Fast</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-word/10">
                  <Sparkles className="h-4 w-4 text-word" />
                </div>
                <span>No Limits</span>
              </div>
            </div>
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
      <footer className="relative border-t border-border/50 px-8 py-8 glass">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              All processing happens locally on your computer. Your files <span className="text-foreground font-medium">never leave your device</span>.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
