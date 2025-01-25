import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface QuizMetadataProps {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export const QuizMetadata = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: QuizMetadataProps) => {
  return (
    <div className="space-y-4">
      <Input
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <Textarea
        placeholder="Quiz Description"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
    </div>
  );
};