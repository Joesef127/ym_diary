"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/rich-text-editor";
import { NoteItem } from "@/components/note-item";
import { LoadingSpinner } from "@/components/loading";
import apiClient from "@/lib/api-client";
import {
  BookOpen,
  Menu,
  Plus,
  LogOut,
  Save,
  ArrowLeft,
  Trash2,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: number;
  email: string;
  name: string;
}

export default function DiaryPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteNoteId, setDeleteNoteId] = useState<number | null>(null);
  const [error, setError] = useState("");

  // Initialize
  useEffect(() => {
    const initializePage = async () => {
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) {
          router.push("/login");
          return;
        }

        const userData = JSON.parse(userStr);
        setUser(userData);

        // Fetch notes
        const response = await apiClient.get("/notes");
        setNotes(response.data);
      } catch (err) {
        console.error("Error initializing:", err);
        localStorage.removeItem("user");
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    initializePage();
  }, [router]);

  const handleNewNote = () => {
    setSelectedNote(null);
    setEditingNote(null);
    setTitle("");
    setContent("");
  };

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
    setEditingNote(null);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setSelectedNote(null);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleSaveNote = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      if (editingNote) {
        // Update existing note
        const response = await apiClient.put(`/notes/${editingNote.id}`, {
          title,
          content,
        });

        setNotes((prev) =>
          prev.map((n) => (n.id === editingNote.id ? response.data : n))
        );
        setSelectedNote(response.data);
        setEditingNote(null);
      } else {
        // Create new note
        const response = await apiClient.post("/notes", {
          title,
          content,
        });

        setNotes((prev) => [response.data, ...prev]);
        setSelectedNote(response.data);
        setTitle("");
        setContent("");
      }
    } catch (err) {
      setError("Failed to save note");
      console.error("Save error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteNote = async () => {
    if (!deleteNoteId) return;

    try {
      await apiClient.delete(`/notes/${deleteNoteId}`);
      setNotes((prev) => prev.filter((n) => n.id !== deleteNoteId));
      
      if (selectedNote?.id === deleteNoteId) {
        handleNewNote();
      }
      if (editingNote?.id === deleteNoteId) {
        handleNewNote();
      }

      setShowDeleteDialog(false);
      setDeleteNoteId(null);
    } catch (err) {
      setError("Failed to delete note");
      console.error("Delete error:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await apiClient.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("user");
      router.push("/login");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: sidebarOpen ? 320 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden border-r border-border bg-card/50 backdrop-blur"
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-foreground">YMDiary</h1>
              </div>

              <Button className="inline-block sm:hidden flex justify-center items-center" onClick={() => setSidebarOpen(!sidebarOpen)} variant="ghost" size="icon">
                {sidebarOpen ? (
                  <ArrowLeft className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>

            <Button
              onClick={handleNewNote}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Note
            </Button>
          </div>

          {/* Notes List */}
          <div className="flex-1 overflow-y-auto p-4">
            <AnimatePresence>
              {notes.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                  <p className="text-sm text-muted-foreground">
                    No diary notes yet
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    Create your first one!
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-2">
                  {notes.map((note) => (
                    <NoteItem
                      key={note.id}
                      note={note}
                      isSelected={selectedNote?.id === note.id}
                      onSelect={handleSelectNote}
                      onEdit={handleEditNote}
                      onDelete={(id) => {
                        setDeleteNoteId(id);
                        setShowDeleteDialog(true);
                      }}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border space-y-2">
            <div className="px-2 py-2 text-xs">
              <p className="font-semibold text-foreground truncate">{user?.name}</p>
              <p className="text-muted-foreground truncate">{user?.email}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className={`border-b border-border bg-card/50 backdrop-blur p-4 flex items-center justify-between ${sidebarOpen ? "w-max" : "w-full"}`}>
          <div className="flex items-center gap-4">
            <Button
            className={`${sidebarOpen ? "hidden"  : ""}`}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              variant="ghost"
              size="icon"
            >
              {sidebarOpen ? (
                <ArrowLeft className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>

            <h2 className="text-lg font-semibold text-foreground">
              {editingNote
                ? "Edit Note"
                : selectedNote
                ? "View Note"
                : "New Note"}
            </h2>
          </div>

          {(title || content) && (
            <div className="flex items-center gap-2">
              {editingNote && (
                <Button
                  onClick={() => {
                    handleNewNote();
                  }}
                  variant="outline"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              )}
              <Button
                onClick={handleSaveNote}
                disabled={isSaving}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {isSaving ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Editor Area */}
        <div className={`flex-1 overflow-y-auto p-6 ${sidebarOpen ? "w-max" : "w-full"}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto space-y-4"
          >
            {selectedNote && !editingNote ? (
              // View Mode
              <div className="space-y-4">
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">
                    {selectedNote.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedNote.updatedAt !== selectedNote.createdAt
                      ? `Updated ${new Date(
                          selectedNote.updatedAt
                        ).toLocaleDateString()}`
                      : `Created ${new Date(
                          selectedNote.createdAt
                        ).toLocaleDateString()}`}
                  </p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-6 min-h-96 whitespace-pre-wrap text-foreground/90">
                  {selectedNote.content}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEditNote(selectedNote)}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                  >
                    Edit Note
                  </Button>
                  <Button
                    onClick={() => {
                      setDeleteNoteId(selectedNote.id);
                      setShowDeleteDialog(true);
                    }}
                    variant="destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ) : (
              // Edit/Create Mode
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Title
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter note title..."
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Content
                  </label>
                  <RichTextEditor
                    value={content}
                    onChange={setContent}
                    placeholder="Write your thoughts, memories, and reflections here... You can use markdown formatting!"
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg"
                  >
                    <p className="text-sm text-red-200">{error}</p>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Note?</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            This action cannot be undone. Are you sure you want to delete this
            note?
          </p>
          <DialogFooter>
            <Button
              onClick={() => setShowDeleteDialog(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteNote}
              variant="destructive"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
