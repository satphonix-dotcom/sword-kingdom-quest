import React, { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ContentListHeader } from "./content/ContentListHeader";
import { ContentRow } from "./content/ContentRow";
import { EmptyState } from "./content/EmptyState";
import { Database } from "@/integrations/supabase/types";

interface ContentListProps {
  contents: Array<{
    id: string;
    page_id: Database["public"]["Enums"]["page_identifier"];
    section_id: string;
    content: any;
    created_at: string;
    updated_at: string;
    created_by: string;
  }>;
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

  // Sort contents by page_id and section_id for better organization
  const sortedContents = [...contents].sort((a, b) => {
    if (a.page_id === b.page_id) {
      return a.section_id.localeCompare(b.section_id);
    }
    return a.page_id.localeCompare(b.page_id);
  });

  return (
    <div className="rounded-md border">
      <Table>
        <ContentListHeader />
        <TableBody>
          {sortedContents.length === 0 ? (
            <EmptyState />
          ) : (
            sortedContents.map((content) => (
              <ContentRow
                key={content.id}
                content={content}
                onEdit={onEdit}
                onDelete={handleDelete}
                deletingId={deletingId}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};