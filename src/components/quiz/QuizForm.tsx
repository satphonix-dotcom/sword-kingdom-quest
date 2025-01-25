import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { QuestionForm } from "./QuestionForm";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload } from "lucide-react";

interface Question {
  id: string;
  question: string;
  correct_answer: string;
  options: string[];
}

interface QuizFormProps {
  userId: string | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const QuizForm = ({ userId, onSuccess, onCancel }: QuizFormProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleCreateQuiz = async () => {
    if (!userId) {
      toast({
        title: "Error",
        description: "User not authenticated",
        variant: "destructive",
      });
      return;
    }

    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Quiz title is required",
        variant: "destructive",
      });
      return;
    }

    if (questions.length === 0) {
      toast({
        title: "Error",
        description: "Add at least one question",
        variant: "destructive",
      });
      return;
    }

    const { data: quizData, error: quizError } = await supabase
      .from("quizzes")
      .insert({
        title,
        description,
        created_by: userId
      })
      .select()
      .single();

    if (quizError) {
      toast({
        title: "Error",
        description: "Failed to create quiz",
        variant: "destructive",
      });
      return;
    }

    const questionsWithQuizId = questions.map(q => ({
      quiz_id: quizData.id,
      question: q.question,
      correct_answer: q.correct_answer,
      options: q.options
    }));

    const { error: questionsError } = await supabase
      .from("questions")
      .insert(questionsWithQuizId);

    if (questionsError) {
      toast({
        title: "Error",
        description: "Failed to add questions",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Quiz created successfully",
    });

    onSuccess();
  };

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
          
          if (question && correctAnswer && options.length >= 3) {
            newQuestions.push({
              id: Math.random().toString(),
              question,
              correct_answer: correctAnswer,
              options: [...options, correctAnswer].sort(() => Math.random() - 0.5)
            });
          }
        }

        if (newQuestions.length > 0) {
          setQuestions(prev => [...prev, ...newQuestions]);
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
    <div className="space-y-4 p-4 border rounded-lg">
      <Input
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Quiz Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

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
          CSV Format: question, correct_answer, option1, option2, option3
        </span>
      </div>

      <QuestionForm onAddQuestion={(question) => setQuestions([...questions, question])} />

      {questions.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold">Added Questions:</h4>
          <ul className="list-disc pl-5">
            {questions.map((q) => (
              <li key={q.id}>{q.question}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleCreateQuiz}>Create Quiz</Button>
      </div>
    </div>
  );
};