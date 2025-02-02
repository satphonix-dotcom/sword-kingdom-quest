import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ContentFormFields } from "./content/ContentFormFields";
import { ContentFormActions } from "./content/ContentFormActions";

interface ContentFormProps {
  userId: string | null;
  onSuccess: () => void;
  onCancel: () => void;
  editContent?: any;
}

export const ContentForm = ({ 
  userId, 
  onSuccess, 
  onCancel, 
  editContent 
}: ContentFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      page_id: editContent?.page_id || "",
      section_id: editContent?.section_id || "",
      content: editContent?.content ? JSON.stringify(editContent.content) : "",
    },
  });

  const onSubmit = async (values: any) => {
    if (!userId) {
      toast({
        title: "Error",
        description: "You must be logged in to perform this action",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const contentData = {
        page_id: values.page_id,
        section_id: values.section_id,
        content: JSON.parse(values.content),
        created_by: userId,
      };

      if (editContent) {
        const { error } = await supabase
          .from("page_contents")
          .update(contentData)
          .eq("id", editContent.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Content updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("page_contents")
          .insert([contentData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Content created successfully",
        });
      }

      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <ContentFormFields form={form} />
        <ContentFormActions 
          isSubmitting={isSubmitting}
          onCancel={onCancel}
          isEditing={!!editContent}
        />
      </form>
    </Form>
  );
};