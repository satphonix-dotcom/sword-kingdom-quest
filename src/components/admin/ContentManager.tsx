import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ContentForm } from "@/components/admin/ContentForm";
import { ContentList } from "@/components/admin/ContentList";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export const ContentManager = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingContent, setEditingContent] = useState<any>(null);

  const { data: contents, refetch, isLoading, error } = useQuery({
    queryKey: ["page-contents"],
    queryFn: async () => {
      console.log("Fetching page contents...");
      const { data, error } = await supabase
        .from("page_contents")
        .select("*")
        .order("page_id", { ascending: true })
        .order("section_id", { ascending: true });

      if (error) {
        console.error("Error fetching contents:", error);
        throw error;
      }
      
      console.log("Fetched contents:", data);
      return data || []; // Ensure we always return an array, even if empty
    },
  });

  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
  });

  const handleContentCreated = () => {
    setShowForm(false);
    setEditingContent(null);
    refetch();
  };

  const handleEdit = (content: any) => {
    setEditingContent(content);
    setShowForm(true);
  };

  if (showForm) {
    return (
      <ContentForm
        userId={session?.user?.id || null}
        onSuccess={handleContentCreated}
        onCancel={() => {
          setShowForm(false);
          setEditingContent(null);
        }}
        editContent={editingContent}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Page Contents</h2>
        <Button onClick={() => setShowForm(true)}>Create Content</Button>
      </div>

      {isLoading && (
        <Alert>
          <AlertDescription>Loading contents...</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to fetch contents. Please try again.</AlertDescription>
        </Alert>
      )}

      {!contents?.length && !isLoading && !error && (
        <Alert>
          <AlertDescription>No content found. Create some content to get started.</AlertDescription>
        </Alert>
      )}

      {contents && contents.length > 0 && !isLoading && !error && (
        <ContentList
          contents={contents}
          onContentsChange={refetch}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};