import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface QuizMetadataFormProps {
  title: string;
  description: string;
  timeLimit: string;
  selectedLevel: number;
  levels: any[] | undefined;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onTimeLimitChange: (value: string) => void;
  onLevelChange: (value: number) => void;
}

export const QuizMetadataForm = ({
  title,
  description,
  timeLimit,
  selectedLevel,
  levels,
  onTitleChange,
  onDescriptionChange,
  onTimeLimitChange,
  onLevelChange,
}: QuizMetadataFormProps) => {
  return (
    <div className="space-y-4">
      <Input
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        required
        className="w-full bg-transparent border-gray-700 text-white"
      />

      <Textarea
        placeholder="Quiz Description"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        className="min-h-[100px] bg-transparent border-gray-700 text-white"
      />

      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            type="number"
            placeholder="Time Limit (minutes)"
            value={timeLimit}
            onChange={(e) => onTimeLimitChange(e.target.value)}
            required
            min="1"
            className="w-full bg-transparent border-gray-700 text-white"
          />
        </div>
        <div className="flex-1">
          <Select
            value={selectedLevel.toString()}
            onValueChange={(value) => onLevelChange(parseInt(value))}
          >
            <SelectTrigger className="w-full bg-transparent border-gray-700 text-white">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              {levels?.map((level) => (
                <SelectItem key={level.id} value={level.order_number.toString()}>
                  Level {level.order_number} ({level.title})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};