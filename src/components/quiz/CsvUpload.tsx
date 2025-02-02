import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Question } from "@/types/quiz";
import { validateCsvRow } from "@/utils/csvValidator";
import { parseCsvContent } from "@/utils/csvParser";
import { CsvErrorDisplay } from "./CsvErrorDisplay";
import { CsvFormatGuide } from "./CsvFormatGuide";
import { FileUploadInput } from "./FileUploadInput";

interface CsvUploadProps {
  onQuestionsImported: (questions: Question[]) => void;
  quizId?: string;
  level?: number;
}

export const CsvUpload = ({ onQuestionsImported, level = 1 }: CsvUploadProps) => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    setError(null);
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file first",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      const { questions, error } = parseCsvContent(text, level);
      
      if (error) {
        setError(error);
        return;
      }

      onQuestionsImported(questions);
      toast({
        title: "Success",
        description: `${questions.length} questions parsed successfully`,
      });

      // Reset the form
      setFile(null);
      setError(null);
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    };

    reader.readAsText(file);
  };

  return (
    <div className="space-y-4">
      <FileUploadInput 
        file={file}
        onFileChange={setFile}
        onUpload={handleUpload}
      />
      <CsvErrorDisplay error={error} />
      <CsvFormatGuide />
    </div>
  );
};