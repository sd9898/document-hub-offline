import { LucideIcon } from "lucide-react";

export type ToolCategory = "pdf" | "word" | "excel" | "powerpoint" | "image";

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: ToolCategory;
  inputFormats: string[];
  outputFormat: string;
}

export interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

export type ProcessingStatus = "idle" | "processing" | "complete" | "error";
