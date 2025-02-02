import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { WysiwygEditor } from "./WysiwygEditor";
import { Database } from "@/integrations/supabase/types";

type PageIdentifier = Database["public"]["Enums"]["page_identifier"];

interface ContentFormFieldsProps {
  form: UseFormReturn<any>;
}

const PAGE_OPTIONS: { value: PageIdentifier; label: string }[] = [
  { value: "home", label: "Home" },
  { value: "about", label: "About" },
  { value: "privacy", label: "Privacy" },
  { value: "faq", label: "FAQ" },
  { value: "study_guide", label: "Study Guide" },
  { value: "learn_more", label: "Learn More" },
  { value: "support", label: "Support" },
  { value: "levels", label: "Levels" },
  { value: "quiz", label: "Quiz" },
  { value: "leaderboard", label: "Leaderboard" },
  { value: "profile", label: "Profile" },
];

export const ContentFormFields = ({ form }: ContentFormFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="page_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Page</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a page" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {PAGE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="section_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Section ID</FormLabel>
            <FormControl>
              <Input placeholder="Enter section ID" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Content</FormLabel>
            <FormControl>
              <WysiwygEditor 
                value={field.value} 
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};