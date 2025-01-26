import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface QuizMetadataProps {
  title: string;
  description: string;
  timeLimit: number | null;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onTimeLimitChange: (value: number | null) => void;
}

export const QuizMetadata = ({
  title,
  description,
  timeLimit,
  onTitleChange,
  onDescriptionChange,
  onTimeLimitChange,
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
      <Input
        type="number"
        placeholder="Time Limit (minutes)"
        value={timeLimit || ""}
        onChange={(e) => {
          const value = e.target.value ? parseInt(e.target.value) : null;
          onTimeLimitChange(value);
        }}
      />
    </div>
  );
};