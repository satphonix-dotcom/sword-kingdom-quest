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
    // First, clean and validate each cell
    const cleanedRow = row.map(cell => cell.trim());
    
    // Check if row has exactly 6 columns (question, correct answer, 4 options)
    if (cleanedRow.length !== 6) {
      return `Row ${rowIndex + 1} is invalid. Expected 6 columns but found ${cleanedRow.length}. Each row must contain: question, correct answer, and 4 options.`;
    }

    // Check for empty cells
    const emptyIndex = cleanedRow.findIndex(cell => !cell);
    if (emptyIndex !== -1) {
      const fieldName = emptyIndex === 0 ? "Question" : 
                       emptyIndex === 1 ? "Correct answer" : 
                       `Option ${emptyIndex - 1}`;
      return `Row ${rowIndex + 1}: ${fieldName} cannot be empty`;
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
        // Split by newline and remove empty rows
        const rows = text.split('\n')
          .map(row => row.split(','))
          .filter(row => row.length > 0 && row.some(cell => cell.trim().length > 0));

        if (rows.length === 0) {
          setError("The CSV file appears to be empty. Please check the file content.");
          return;
        }
        
        // Skip header row if it exists (case insensitive check for "question" in first cell)
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

        // Process valid rows into questions
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
      
      {error && (
        <Alert variant="destructive">
          <AlertDescription className="whitespace-pre-line">
            {error}
          </AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2 border border-gray-700 rounded-lg p-4 bg-gray-900/50">
        <p className="text-sm text-gray-400 font-medium">CSV Format Requirements:</p>
        <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
          <li>File must be in CSV format (.csv)</li>
          <li>Each row must contain exactly 6 columns in this order:</li>
          <li className="ml-6">1. Question text</li>
          <li className="ml-6">2. Correct answer</li>
          <li className="ml-6">3. Option 1</li>
          <li className="ml-6">4. Option 2</li>
          <li className="ml-6">5. Option 3</li>
          <li className="ml-6">6. Option 4</li>
          <li>No empty fields are allowed</li>
          <li>Headers are optional (will be skipped if present)</li>
          <li>Example row: What is 2+2?,4,2,3,4,5</li>
        </ul>
      </div>
    </div>
  );
};