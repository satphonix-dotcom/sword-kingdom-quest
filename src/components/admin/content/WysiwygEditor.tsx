import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from "@/components/ui/button";
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading2,
  Undo,
  Redo
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WysiwygEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const WysiwygEditor = ({ value, onChange }: WysiwygEditorProps) => {
  const { toast } = useToast();

  const parseInitialContent = (value: string) => {
    try {
      if (!value) return '';
      const parsed = JSON.parse(value);
      return parsed.content || '';
    } catch (e) {
      console.error('Error parsing initial content:', e);
      toast({
        title: "Warning",
        description: "Invalid content format detected",
        variant: "destructive",
      });
      return '';
    }
  };

  const editor = useEditor({
    extensions: [StarterKit],
    content: parseInitialContent(value),
    onUpdate: ({ editor }) => {
      try {
        const json = JSON.stringify({ content: editor.getHTML() });
        onChange(json);
      } catch (e) {
        console.error('Error updating content:', e);
        toast({
          title: "Error",
          description: "Failed to update content",
          variant: "destructive",
        });
      }
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md">
      <div className="flex gap-2 p-2 border-b bg-muted/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-muted' : ''}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-muted' : ''}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'bg-muted' : ''}
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-muted' : ''}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-muted' : ''}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>
      <EditorContent editor={editor} className="p-4 min-h-[200px] prose prose-sm max-w-none" />
    </div>
  );
};