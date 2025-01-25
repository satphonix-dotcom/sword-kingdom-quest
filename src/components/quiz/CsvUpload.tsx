import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  question: string;
  correct_answer: string;
  options: string[];
}

interface CsvUploadProps {
  onQuestionsImported: (questions: Question[]) => void;
}

export const CsvUpload = ({ onQuestionsImported }: CsvUploadProps) => {
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string;
        const rows = text.split('\n');
        const newQuestions: Question[] = [];

        // Skip header row and process each line
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i].trim();
          if (!row) continue;

          const [question, correctAnswer, ...options] = row.split(',').map(item => item.trim());
          
          if (question && correctAnswer && options.length >= 4) {
            newQuestions.push({
              id: Math.random().toString(),
              question,
              correct_answer: correctAnswer,
              options: [...options.slice(0, 4), correctAnswer].sort(() => Math.random() - 0.5)
            });
          }
        }

        if (newQuestions.length > 0) {
          onQuestionsImported(newQuestions);
          toast({
            title: "Success",
            description: `${newQuestions.length} questions imported successfully`,
          });
        } else {
          toast({
            title: "Error",
            description: "No valid questions found in the file",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to parse CSV file",
          variant: "destructive",
        });
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="flex items-center gap-4">
      <Input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
        id="csv-upload"
      />
      <label
        htmlFor="csv-upload"
        className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md cursor-pointer"
      >
        <Upload className="h-4 w-4" />
        Upload CSV
      </label>
      <span className="text-sm text-muted-foreground">
        CSV Format: question, correct_answer, option1, option2, option3, option4
      </span>
    </div>
  );
};