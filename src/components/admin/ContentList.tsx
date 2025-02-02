import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ContentListHeader } from "./content/ContentListHeader";
import { ContentListActions } from "./content/ContentListActions";

interface ContentListProps {
  contents: any[];
  onContentsChange: () => void;
  onEdit: (content: any) => void;
}

export const ContentList = ({ 
  contents, 
  onContentsChange, 
  onEdit 
}: ContentListProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      const { error } = await supabase
        .from("page_contents")
        .delete()
        .eq("id", id);

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
        <ContentListHeader />
        <TableBody>
          {contents.length === 0 ? (
            <TableRow>
              <TableCell 
                colSpan={4} 
                className="text-center py-4 text-muted-foreground"
              >
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
                  <ContentListActions
                    onEdit={() => onEdit(content)}
                    onDelete={() => handleDelete(content.id)}
                    isDeleting={deletingId === content.id}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};