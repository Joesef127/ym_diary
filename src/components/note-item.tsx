"use client";

import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Eye, Edit, Trash2 } from "lucide-react";

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface NoteItemProps {
  note: Note;
  isSelected: boolean;
  onSelect: (note: Note) => void;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
}

export function NoteItem({
  note,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}: NoteItemProps) {
  const truncateText = (text: string, length: number = 50) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const isUpdated = new Date(note.updatedAt) > new Date(note.createdAt);
  const timestamp = isUpdated ? note.updatedAt : note.createdAt;
  const label = isUpdated ? "Updated" : "Created";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect(note)}
      className={`group p-3 rounded-lg cursor-pointer transition-all duration-200 ${
        isSelected
          ? "bg-primary/20 border border-primary/50"
          : "hover:bg-secondary/50 border border-transparent"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm truncate text-foreground">
            {note.title || "Untitled"}
          </h3>
          <p className="text-xs text-muted-foreground truncate mt-1">
            {truncateText(note.content, 40)}
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2">
            {label} {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onSelect(note)}>
              <Eye className="h-4 w-4 mr-2" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(note)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(note.id)}
              className="text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
}
