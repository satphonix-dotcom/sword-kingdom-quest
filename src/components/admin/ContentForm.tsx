import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ContentFormFields } from "./content/ContentFormFields";
import { ContentFormActions } from "./content/ContentFormActions";
import { Database } from "@/integrations/supabase/types";

type PageIdentifier = Database["public"]["Enums"]["page_identifier"];

const contentFormSchema = z.object({
  page_id: z.enum([
    "home",
    "about",
    "privacy",
    "faq",
    "study_guide",
    "learn_more",
    "support",
    "levels",
    "quiz",
    "leaderboard",
    "profile"
  ] as const),
  section_id: z.string().min(1, "Section ID is required"),
  content: z.string().min(1, "Content is required"),
});

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
  
  const form = useForm<z.infer<typeof contentFormSchema>>({
    resolver: zodResolver(contentFormSchema),
    defaultValues: {
      page_id: (editContent?.page_id as PageIdentifier) || "home",
      section_id: editContent?.section_id || "",
      content: editContent?.content ? JSON.stringify(editContent.content) : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof contentFormSchema>) => {
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
      let parsedContent;
      try {
        parsedContent = JSON.parse(values.content);
      } catch (e) {
        toast({
          title: "Error",
          description: "Invalid content format",
          variant: "destructive",
        });
        return;
      }

      const contentData = {
        page_id: values.page_id,
        section_id: values.section_id,
        content: parsedContent,
        created_by: userId,
      } as const;

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