import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QuestionForm } from "./QuestionForm";
import { QuestionsList } from "./QuestionsList";
import { CsvUpload } from "./CsvUpload";
import { supabase } from "@/integrations/supabase/client";
import { Quiz, Question } from "@/types/quiz";
import { useToast } from "@/hooks/use-toast";

interface QuizFormProps {
  userId: string | null;
  onSuccess: () => void;
  onCancel: () => void;
  editQuiz?: Quiz;
}

export const QuizForm = ({ userId, onSuccess, onCancel, editQuiz }: QuizFormProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState(editQuiz?.title || "");
  const [description, setDescription] = useState(editQuiz?.description || "");
  const [timeLimit, setTimeLimit] = useState(editQuiz?.time_limit?.toString() || "30");
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>("1");
  const [questions, setQuestions] = useState<Question[]>([]);

  const { data: levels } = useQuery({
    queryKey: ["levels"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("levels")
        .select("*")
        .order("order_number");

      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      toast({
        title: "Error",
        description: "You must be logged in to create a quiz",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editQuiz) {
        const { error } = await supabase
          .from("quizzes")
          .update({
            title,
            description,
            time_limit: parseInt(timeLimit),
          })
          .eq("id", editQuiz.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("quizzes").insert([
          {
            title,
            description,
            created_by: userId,
            time_limit: parseInt(timeLimit),
          },
        ]);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `Quiz ${editQuiz ? "updated" : "created"} successfully`,
      });
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleQuestionsImported = (importedQuestions: Question[]) => {
    setQuestions([...questions, ...importedQuestions]);
  };

  if (showQuestionForm && editQuiz) {
    return (
      <div className="space-y-6">
        <QuestionForm
          quizId={editQuiz.id}
          onBack={() => setShowQuestionForm(false)}
          level={parseInt(selectedLevel)}
        />
        <CsvUpload onQuestionsImported={handleQuestionsImported} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto bg-[#020817] p-8 rounded-lg">
      <Input
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full bg-transparent border-gray-700 text-white"
      />

      <Textarea
        placeholder="Quiz Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="min-h-[100px] bg-transparent border-gray-700 text-white"
      />

      <Input
        type="number"
        placeholder="Time Limit (minutes)"
        value={timeLimit}
        onChange={(e) => setTimeLimit(e.target.value)}
        required
        min="1"
        className="w-full bg-transparent border-gray-700 text-white"
      />

      <div className="space-y-4">
        <h3 className="text-white font-semibold">Import Questions from CSV</h3>
        <CsvUpload onQuestionsImported={handleQuestionsImported} />
      </div>

      <div className="space-y-4">
        <h3 className="text-white font-semibold">Add Questions</h3>
        <QuestionForm 
          onAddQuestion={(question) => setQuestions([...questions, question])}
        />
      </div>

      <QuestionsList questions={questions} />

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="bg-transparent text-white border-gray-700 hover:bg-gray-800"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          {editQuiz ? "Update Quiz" : "Create Quiz"}
        </Button>
      </div>
    </form>
  );
};