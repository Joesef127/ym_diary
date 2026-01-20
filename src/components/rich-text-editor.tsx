"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
  Palette,
  Type,
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
  const editorRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isEmpty, setIsEmpty] = useState(!value);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    heading: false,
    quote: false,
    bulletList: false,
    numberedList: false,
    code: false,
  });

  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const updateActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      heading: document.queryCommandValue("formatBlock") === "h2",
      quote: document.queryCommandValue("formatBlock") === "blockquote",
      bulletList: document.queryCommandState("insertUnorderedList"),
      numberedList: document.queryCommandState("insertOrderedList"),
      code: document.queryCommandValue("formatBlock") === "pre",
    });
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
      setIsEmpty(!editorRef.current.innerHTML);
      updateActiveFormats();
    }
  };

  const handleMouseUp = () => {
    updateActiveFormats();
  };

  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    setTimeout(() => updateActiveFormats(), 0);
  };

  const applyFontSize = (size: string) => {
    // Map readable sizes to HTML font sizes (1-7)
    const sizeMap: { [key: string]: string } = {
      "Small": "1",
      "Normal": "3",
      "Large": "5",
      "Extra Large": "6",
      "Huge": "7",
    };
    document.execCommand("fontSize", false, sizeMap[size]);
    editorRef.current?.focus();
  };

  const applyTextColor = (color: string) => {
    document.execCommand("foreColor", false, color);
    editorRef.current?.focus();
  };

  const copyToClipboard = () => {
    if (editorRef.current) {
      navigator.clipboard.writeText(editorRef.current.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatTools = [
    {
      label: "Bold",
      icon: Bold,
      action: () => applyFormat("bold"),
      isActive: activeFormats.bold,
    },
    {
      label: "Italic",
      icon: Italic,
      action: () => applyFormat("italic"),
      isActive: activeFormats.italic,
    },
    {
      label: "Underline",
      icon: Underline,
      action: () => applyFormat("underline"),
      isActive: activeFormats.underline,
    },
    {
      label: "Heading",
      icon: Heading2,
      action: () => applyFormat("formatBlock", "<h2>"),
      isActive: activeFormats.heading,
    },
    {
      label: "Quote",
      icon: Quote,
      action: () => applyFormat("formatBlock", "<blockquote>"),
      isActive: activeFormats.quote,
    },
    {
      label: "Bullet List",
      icon: List,
      action: () => applyFormat("insertUnorderedList"),
      isActive: activeFormats.bulletList,
    },
    {
      label: "Numbered List",
      icon: ListOrdered,
      action: () => applyFormat("insertOrderedList"),
      isActive: activeFormats.numberedList,
    },
    {
      label: "Code",
      icon: Code,
      action: () => applyFormat("formatBlock", "<pre>"),
      isActive: activeFormats.code,
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
            className={`h-8 w-8 p-0 transition-colors ${
              tool.isActive
                ? "bg-primary/30 text-primary hover:bg-primary/40"
                : "hover:bg-primary/20"
            }`}
          >
            <tool.icon className="h-4 w-4" />
          </Button>
        ))}

        <div className="w-px bg-border mx-1" />

        {/* Font Size Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              title="Font Size"
              className="h-8 px-2 hover:bg-primary/20 flex items-center gap-1"
            >
              <Type className="h-4 w-4" />
              <span className="text-xs">Size</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
              Font Size
            </div>
            <DropdownMenuItem onClick={() => applyFontSize("Small")}>
              Small
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => applyFontSize("Normal")}>
              Normal
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => applyFontSize("Large")}>
              Large
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => applyFontSize("Extra Large")}>
              Extra Large
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => applyFontSize("Huge")}>
              Huge
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Text Color Picker */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              title="Text Color"
              className="h-8 w-8 p-0 hover:bg-primary/20"
            >
              <Palette className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
              Text Color
            </div>
            <div className="grid grid-cols-6 gap-1 p-2">
              {[
                "#000000",
                "#FFFFFF",
                "#EF4444",
                "#F97316",
                "#EAB308",
                "#22C55E",
                "#0EA5E9",
                "#8B5CF6",
                "#EC4899",
                "#6B7280",
                "#3B82F6",
                "#14B8A6",
              ].map((color) => (
                <button
                  key={color}
                  onClick={() => applyTextColor(color)}
                  className="h-6 w-6 rounded border border-border hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
            <div className="h-px bg-border my-1" />
            <div className="p-2">
              <label className="text-xs font-semibold text-muted-foreground">
                Custom Color
              </label>
              <input
                type="color"
                onChange={(e) => applyTextColor(e.target.value)}
                className="w-full h-8 rounded cursor-pointer mt-1 border border-border"
                defaultValue="#000000"
              />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

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
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
              Headings
            </div>
            <DropdownMenuItem onClick={() => applyFormat("formatBlock", "<h1>")}>
              Heading 1
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => applyFormat("formatBlock", "<h2>")}>
              Heading 2
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => applyFormat("formatBlock", "<h3>")}>
              Heading 3
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => applyFormat("formatBlock", "<h4>")}>
              Heading 4
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => applyFormat("formatBlock", "<h5>")}>
              Heading 5
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => applyFormat("formatBlock", "<h6>")}>
              Heading 6
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => applyFormat("formatBlock", "<p>")}>
              Paragraph
            </DropdownMenuItem>
            
            <div className="h-px bg-border my-1.5" />
            
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
              Formatting
            </div>
            <DropdownMenuItem onClick={() => applyFormat("removeFormat")}>
              Clear Formatting
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => applyFormat("insertHorizontalRule")}>
              Divider
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
                  Copy Text
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div
        ref={editorRef}
        onInput={handleInput}
        onMouseUp={handleMouseUp}
        onKeyUp={handleMouseUp}
        onFocus={updateActiveFormats}
        contentEditable
        suppressContentEditableWarning
        className="min-h-96 p-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none text-foreground text-sm sm:text-sm md:text-base lg:text-lg leading-6 placeholder:opacity-50"
        style={{
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
        onPaste={(e) => {
          e.preventDefault();
          const text = e.clipboardData.getData("text/plain");
          document.execCommand("insertText", false, text);
        }}
        data-placeholder={isEmpty ? placeholder : ""}
      >
      </div>
    </div>
  );
}
