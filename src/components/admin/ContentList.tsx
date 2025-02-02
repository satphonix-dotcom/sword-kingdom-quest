import React, { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ContentListHeader } from "./content/ContentListHeader";
import { ContentRow } from "./content/ContentRow";
import { EmptyState } from "./content/EmptyState";

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

  return (
    <div className="rounded-md border">
      <Table>
        <ContentListHeader />
        <TableBody>
          {contents.length === 0 ? (
            <EmptyState />
          ) : (
            contents.map((content) => (
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