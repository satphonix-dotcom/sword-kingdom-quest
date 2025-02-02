import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface ContentFormFieldsProps {
  form: UseFormReturn<any>;
}

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
                <SelectItem value="home">Home</SelectItem>
                <SelectItem value="about">About</SelectItem>
                <SelectItem value="privacy">Privacy</SelectItem>
                <SelectItem value="faq">FAQ</SelectItem>
                <SelectItem value="study_guide">Study Guide</SelectItem>
                <SelectItem value="learn_more">Learn More</SelectItem>
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
            <FormLabel>Content (JSON)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter content in JSON format"
                className="h-32"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};