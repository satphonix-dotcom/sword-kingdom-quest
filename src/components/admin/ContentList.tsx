import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Eye } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ContentListProps {
  contents: any[];
  onContentsChange: () => void;
  onEdit: (content: any) => void;
}

export const ContentList = ({ contents, onContentsChange, onEdit }: ContentListProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!deletingId) return;

    try {
      const { error } = await supabase
        .from("page_contents")
        .delete()
        .eq("id", deletingId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content deleted successfully",
      });
      onContentsChange();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const formatContent = (content: any) => {
    try {
      if (typeof content === 'string') {
        return JSON.stringify(JSON.parse(content), null, 2);
      }
      return JSON.stringify(content, null, 2);
    } catch (e) {
      return String(content);
    }
  };

  const getPageTitle = (pageId: string) => {
    const titles: { [key: string]: string } = {
      home: "Home Page",
      about: "About Us",
      privacy: "Privacy Policy",
      faq: "FAQ",
      study_guide: "Study Guide",
      learn_more: "Learn More",
    };
    return titles[pageId] || pageId;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Page</TableHead>
            <TableHead className="w-[200px]">Section</TableHead>
            <TableHead>Content Preview</TableHead>
            <TableHead className="w-[100px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                No content found. Click "Create Content" to add some.
              </TableCell>
            </TableRow>
          ) : (
            contents.map((content) => (
              <TableRow key={content.id}>
                <TableCell className="font-medium">
                  {getPageTitle(content.page_id)}
                </TableCell>
                <TableCell>{content.section_id}</TableCell>
                <TableCell className="max-w-[400px]">
                  <div className="max-h-[100px] overflow-y-auto">
                    <pre className="text-xs whitespace-pre-wrap">
                      {formatContent(content.content)}
                    </pre>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit(content)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit content</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <AlertDialog>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setDeletingId(content.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete content</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete
                            this content.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => setDeletingId(null)}>
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction onClick={handleDelete}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};