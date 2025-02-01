import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Question } from "@/types/quiz";
import { supabase } from "@/integrations/supabase/client";

interface CsvUploadProps {
  onQuestionsImported: (questions: Question[]) => void;
}

export const CsvUpload = ({ onQuestionsImported }: CsvUploadProps) => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
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

    const { data: quizData } = await supabase
      .from("quizzes")
      .select("id")
      .limit(1)
      .single();

    if (!quizData?.id) {
      toast({
        title: "Error",
        description: "No quiz found to import questions into",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const rows = text.split('\n').filter(row => row.trim());
        
        const questions: Question[] = rows.slice(1).map(row => {
          const [question, correctAnswer, ...options] = row.split(',').map(cell => cell.trim());
          return {
            id: Math.random().toString(),
            question,
            correct_answer: correctAnswer,
            options: [...options, correctAnswer].sort(() => Math.random() - 0.5),
            level: 1,
            quiz_id: quizData.id
          };
        });

        onQuestionsImported(questions);
        toast({
          title: "Success",
          description: `Imported ${questions.length} questions`,
        });
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