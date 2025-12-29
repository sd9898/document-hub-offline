import {
  Merge,
  Split,
  Minimize2,
  RotateCw,
  FileText,
  FileSpreadsheet,
  Presentation,
  ImageIcon,
  FileOutput,
  Image,
} from "lucide-react";
import { Tool } from "@/types/tools";

export const pdfTools: Tool[] = [
  {
    id: "merge-pdf",
    name: "Merge PDF",
    description: "Combine multiple PDFs into one document",
    icon: Merge,
    category: "pdf",
    inputFormats: [".pdf"],
    outputFormat: "PDF",
  },
  {
    id: "split-pdf",
    name: "Split PDF",
    description: "Extract pages or split into multiple files",
    icon: Split,
    category: "pdf",
    inputFormats: [".pdf"],
    outputFormat: "PDF",
  },
  {
    id: "compress-pdf",
    name: "Compress PDF",
    description: "Reduce file size while maintaining quality",
    icon: Minimize2,
    category: "pdf",
    inputFormats: [".pdf"],
    outputFormat: "PDF",
  },
  {
    id: "rotate-pdf",
    name: "Rotate Pages",
    description: "Rotate PDF pages to any orientation",
    icon: RotateCw,
    category: "pdf",
    inputFormats: [".pdf"],
    outputFormat: "PDF",
  },
];

export const convertToPdfTools: Tool[] = [
  {
    id: "word-to-pdf",
    name: "Word to PDF",
    description: "Convert Word documents to PDF format",
    icon: FileText,
    category: "word",
    inputFormats: [".doc", ".docx"],
    outputFormat: "PDF",
  },
  {
    id: "excel-to-pdf",
    name: "Excel to PDF",
    description: "Convert spreadsheets to PDF format",
    icon: FileSpreadsheet,
    category: "excel",
    inputFormats: [".xls", ".xlsx"],
    outputFormat: "PDF",
  },
  {
    id: "powerpoint-to-pdf",
    name: "PowerPoint to PDF",
    description: "Convert presentations to PDF format",
    icon: Presentation,
    category: "powerpoint",
    inputFormats: [".ppt", ".pptx"],
    outputFormat: "PDF",
  },
  {
    id: "image-to-pdf",
    name: "Image to PDF",
    description: "Convert images to PDF documents",
    icon: ImageIcon,
    category: "image",
    inputFormats: [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"],
    outputFormat: "PDF",
  },
];

export const convertFromPdfTools: Tool[] = [
  {
    id: "pdf-to-word",
    name: "PDF to Word",
    description: "Convert PDFs to editable Word documents",
    icon: FileOutput,
    category: "word",
    inputFormats: [".pdf"],
    outputFormat: "DOCX",
  },
  {
    id: "pdf-to-jpg",
    name: "PDF to JPG",
    description: "Extract pages as high-quality images",
    icon: Image,
    category: "image",
    inputFormats: [".pdf"],
    outputFormat: "JPG",
  },
];

export const allTools = [...pdfTools, ...convertToPdfTools, ...convertFromPdfTools];

export const getToolById = (id: string): Tool | undefined => {
  return allTools.find((tool) => tool.id === id);
};
