import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  // Fetch levels using React Query
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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
        <Input
          id="timeLimit"
          type="number"
          value={timeLimit}
          onChange={(e) => setTimeLimit(e.target.value)}
          required
          min="1"
          className="w-full"
        />
      </div>

      {editQuiz && (
        <div className="space-y-2">
          <Label htmlFor="level">Level</Label>
          <Select
            value={selectedLevel}
            onValueChange={setSelectedLevel}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a level" />
            </SelectTrigger>
            <SelectContent>
              {levels?.map((level) => (
                <SelectItem key={level.order_number} value={level.order_number.toString()}>
                  Level {level.order_number}: {level.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex justify-between">
        <div className="space-x-2">
          <Button type="submit">
            {editQuiz ? "Update Quiz" : "Create Quiz"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
        {editQuiz && (
          <Button
            type="button"
            onClick={() => setShowQuestionForm(true)}
          >
            Add Questions
          </Button>
        )}
      </div>

      {editQuiz && <QuestionsList quizId={editQuiz.id} questions={questions} />}
    </form>
  );
};