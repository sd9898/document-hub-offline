import { useState } from "react";
import { Tool } from "@/types/tools";
import { Home } from "./Home";
import { ToolPage } from "./ToolPage";

const Index = () => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  if (selectedTool) {
    return (
      <ToolPage tool={selectedTool} onBack={() => setSelectedTool(null)} />
    );
  }

  return <Home onToolSelect={setSelectedTool} />;
};

export default Index;
