"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading2,
  Quote,
  Code,
  Smile,
  Copy,
  Check,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your thoughts here...",
  className = "",
}: RichTextEditorProps) {
  const [copied, setCopied] = useState(false);

  const insertMarkdown = (before: string, after: string = before) => {
    const textarea = document.querySelector("textarea");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || "text";

    const newValue =
      value.substring(0, start) +
      before +
      selectedText +
      after +
      value.substring(end);

    onChange(newValue);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTools = [
    {
      label: "Bold",
      icon: Bold,
      action: () => insertMarkdown("**", "**"),
    },
    {
      label: "Italic",
      icon: Italic,
      action: () => insertMarkdown("*", "*"),
    },
    {
      label: "Underline",
      icon: Underline,
      action: () => insertMarkdown("<u>", "</u>"),
    },
    {
      label: "Heading",
      icon: Heading2,
      action: () => insertMarkdown("## ", ""),
    },
    {
      label: "Quote",
      icon: Quote,
      action: () => insertMarkdown("> ", ""),
    },
    {
      label: "Bullet List",
      icon: List,
      action: () => insertMarkdown("- ", ""),
    },
    {
      label: "Numbered List",
      icon: ListOrdered,
      action: () => insertMarkdown("1. ", ""),
    },
    {
      label: "Code",
      icon: Code,
      action: () => insertMarkdown("`", "`"),
    },
  ];

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex flex-wrap gap-1 p-2 bg-secondary/50 rounded-lg border border-border">
        {formatTools.map((tool) => (
          <Button
            key={tool.label}
            onClick={tool.action}
            variant="ghost"
            size="sm"
            title={tool.label}
            className="h-8 w-8 p-0 hover:bg-primary/20"
          >
            <tool.icon className="h-4 w-4" />
          </Button>
        ))}

        <div className="w-px bg-border mx-1" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              title="More options"
              className="h-8 w-8 p-0 hover:bg-primary/20"
            >
              <Smile className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => insertMarkdown("> ", "")}>
              Code Block
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => insertMarkdown("---\n", "")}
            >
              Divider
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => insertMarkdown("[", "](url)")}>
              Link
            </DropdownMenuItem>
            <DropdownMenuItem onClick={copyToClipboard}>
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy All
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[300px] font-mono text-sm resize-none"
      />
    </div>
  );
}
