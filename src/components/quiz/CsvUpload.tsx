import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Question } from "@/types/quiz";
import { supabase } from "@/integrations/supabase/client";

interface CsvUploadProps {
  onQuestionsImported: (questions: Question[]) => void;
  quizId?: string;
  level?: number;
}

export const CsvUpload = ({ onQuestionsImported, quizId, level = 1 }: CsvUploadProps) => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const validateCsvRow = (row: string[]): boolean => {
    // Check if we have at least question, correct answer, and one option
    if (row.length < 3) return false;
    // Check if all fields are non-empty
    return row.every(field => field.trim().length > 0);
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file first",
        variant: "destructive",
      });
      return;
    }

    if (!quizId) {
      toast({
        title: "Error",
        description: "No quiz selected to import questions into",
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
          .filter(row => row.length > 1); // Filter out empty rows
        
        // Remove header row if present
        const dataRows = rows[0][0].toLowerCase().includes('question') ? rows.slice(1) : rows;
        
        const validRows = dataRows.filter(validateCsvRow);

        if (validRows.length === 0) {
          toast({
            title: "Error",
            description: "No valid questions found in CSV file",
            variant: "destructive",
          });
          return;
        }

        const questions: Question[] = validRows.map(row => {
          const [question, correctAnswer, ...options] = row;
          return {
            id: crypto.randomUUID(),
            question,
            correct_answer: correctAnswer,
            options: [...new Set([...options, correctAnswer])].sort(() => Math.random() - 0.5),
            level,
            quiz_id: quizId
          };
        });

        // Insert questions into database
        const { error } = await supabase
          .from('questions')
          .insert(questions.map(q => ({
            question: q.question,
            correct_answer: q.correct_answer,
            options: q.options,
            level: q.level,
            quiz_id: q.quiz_id
          })));

        if (error) {
          console.error('Error inserting questions:', error);
          throw error;
        }

        onQuestionsImported(questions);
        toast({
          title: "Success",
          description: `Imported ${questions.length} questions`,
        });

        // Clear the file input
        setFile(null);
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = '';

      } catch (error: any) {
        console.error('CSV upload error:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to parse CSV file",
          variant: "destructive",
        });
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="space-y-2">
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
          Upload
        </Button>
      </div>
      <p className="text-sm text-gray-400">
        CSV format: question,correct_answer,option1,option2,option3
      </p>
    </div>
  );
};