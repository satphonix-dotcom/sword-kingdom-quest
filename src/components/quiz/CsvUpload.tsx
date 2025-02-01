import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Question } from "@/types/quiz";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

  const validateCsvRow = (row: string[], rowIndex: number): string | null => {
    // Check if row has exactly 6 columns (question, correct answer, 4 options)
    if (row.length !== 6) {
      return `Row ${rowIndex + 1} must have exactly 6 columns (question, correct answer, and 4 options)`;
    }

    // Check if any field is empty
    const emptyFields = row.map((field, index) => ({
      field: field.trim(),
      index
    })).filter(({ field }) => field.length === 0);

    if (emptyFields.length > 0) {
      const fieldNames = emptyFields.map(({ index }) => {
        if (index === 0) return "question";
        if (index === 1) return "correct answer";
        return `option ${index - 1}`;
      });
      return `Row ${rowIndex + 1} has empty ${fieldNames.join(", ")}`;
    }

    return null;
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
        const rows = text.split('\n')
          .map(row => row.split(',').map(cell => cell.trim()))
          .filter(row => row.length > 1 && row.some(cell => cell.length > 0));
        
        // Skip header row if it exists
        const dataRows = rows[0][0].toLowerCase().includes('question') ? rows.slice(1) : rows;
        
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

        const questions: Question[] = dataRows.map(row => {
          const [question, correctAnswer, ...options] = row;
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
          description: `${questions.length} questions parsed successfully. Click "Create Quiz" to save them.`,
        });

        // Clear the file input and error
        setFile(null);
        setError(null);
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = '';

      } catch (error: any) {
        console.error('CSV upload error:', error);
        setError(error.message || "Failed to parse CSV file");
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
      
      {error && (
        <Alert variant="destructive">
          <AlertDescription className="whitespace-pre-line">
            {error}
          </AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2">
        <p className="text-sm text-gray-400 font-medium">CSV Format Requirements:</p>
        <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
          <li>Each row must contain exactly 6 columns</li>
          <li>Column order: question, correct_answer, option1, option2, option3, option4</li>
          <li>No empty fields allowed</li>
          <li>Headers are optional (will be skipped if present)</li>
        </ul>
      </div>
    </div>
  );
};