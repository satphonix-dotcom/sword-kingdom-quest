import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Question } from "@/types/quiz";
import { validateCsvRow } from "@/utils/csvValidator";
import { CsvErrorDisplay } from "./CsvErrorDisplay";
import { CsvFormatGuide } from "./CsvFormatGuide";

interface CsvUploadProps {
  onQuestionsImported: (questions: Question[]) => void;
  quizId?: string;
  level?: number;
}

export const CsvUpload = ({ onQuestionsImported, level = 1 }: CsvUploadProps) => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

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
      try {
        const text = e.target?.result as string;
        // Split by newline and remove empty rows
        const rows = text.split('\n')
          .map(row => row.split(','))
          .filter(row => row.length > 0 && row.some(cell => cell.trim().length > 0));

        if (rows.length === 0) {
          setError("The CSV file appears to be empty. Please check the file content.");
          return;
        }
        
        // Skip header row if it exists
        const dataRows = rows[0][0].toLowerCase().includes('question') ? rows.slice(1) : rows;
        
        if (dataRows.length === 0) {
          setError("No valid data rows found in the CSV file. Please check the format.");
          return;
        }

        // Validate all rows first
        const validationErrors: string[] = [];
        dataRows.forEach((row, index) => {
          const error = validateCsvRow(row, index);
          if (error) validationErrors.push(error);
        });

        if (validationErrors.length > 0) {
          setError(validationErrors.join('\n'));
          return;
        }

        // Process valid rows into questions that match the database schema
        const questions: Question[] = dataRows.map(row => {
          const [question, correctAnswer, ...options] = row.map(cell => cell.trim());
          return {
            id: crypto.randomUUID(),
            question,
            correct_answer: correctAnswer,
            options: [...new Set([...options, correctAnswer])].sort(() => Math.random() - 0.5),
            level,
            quiz_id: crypto.randomUUID()
          };
        });

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

      } catch (error: any) {
        console.error('CSV parsing error:', error);
        setError("Failed to parse the CSV file. Please ensure it follows the required format.");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="flex-1 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-700 cursor-pointer"
        />
        <Button 
          onClick={handleUpload}
          disabled={!file}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Parse CSV
        </Button>
      </div>
      
      <CsvErrorDisplay error={error} />
      <CsvFormatGuide />
    </div>
  );
};