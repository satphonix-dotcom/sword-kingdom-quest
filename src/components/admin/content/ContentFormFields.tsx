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
                <SelectItem value="support">Support</SelectItem>
                <SelectItem value="levels">Levels</SelectItem>
                <SelectItem value="quiz">Quiz</SelectItem>
                <SelectItem value="leaderboard">Leaderboard</SelectItem>
                <SelectItem value="profile">Profile</SelectItem>
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