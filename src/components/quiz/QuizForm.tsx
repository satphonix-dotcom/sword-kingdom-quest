import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [points, setPoints] = useState(editQuiz?.points?.toString() || "10");
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const { data: quizQuestions } = useQuery({
    queryKey: ["quiz-questions", editQuiz?.id],
    queryFn: async () => {
      if (!editQuiz?.id) return null;
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("quiz_id", editQuiz.id);

      if (error) throw error;
      return data;
    },
    enabled: !!editQuiz?.id,
  });

  useEffect(() => {
    if (quizQuestions) {
      const convertedQuestions: Question[] = quizQuestions.map(q => ({
        ...q,
        options: Array.isArray(q.options) 
          ? q.options.map(opt => String(opt))
          : []
      }));
      setQuestions(convertedQuestions);
      if (convertedQuestions.length > 0) {
        setSelectedLevel(convertedQuestions[0].level);
      }
    }
  }, [quizQuestions]);

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

    if (questions.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one question to the quiz",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let quizId = editQuiz?.id;

      if (!quizId) {
        // Create new quiz
        const { data: newQuiz, error: quizError } = await supabase
          .from("quizzes")
          .insert([
            {
              title,
              description,
              created_by: userId,
              time_limit: parseInt(timeLimit),
              points: parseInt(points),
            },
          ])
          .select()
          .single();

        if (quizError) throw quizError;
        quizId = newQuiz.id;
      } else {
        // Update existing quiz
        const { error: updateError } = await supabase
          .from("quizzes")
          .update({
            title,
            description,
            time_limit: parseInt(timeLimit),
            points: parseInt(points),
          })
          .eq("id", quizId);

        if (updateError) throw updateError;
      }

      // Insert or update questions
      if (questions.length > 0) {
        const questionsToInsert = questions.map(q => ({
          ...q,
          quiz_id: quizId
        }));

        const { error: questionsError } = await supabase
          .from("questions")
          .insert(questionsToInsert);

        if (questionsError) throw questionsError;
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuestionsImported = (importedQuestions: Question[]) => {
    setQuestions(prevQuestions => [...prevQuestions, ...importedQuestions]);
  };

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

      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            type="number"
            placeholder="Time Limit (minutes)"
            value={timeLimit}
            onChange={(e) => setTimeLimit(e.target.value)}
            required
            min="1"
            className="w-full bg-transparent border-gray-700 text-white"
          />
        </div>
        <div className="flex-1">
          <Input
            type="number"
            placeholder="Points"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            required
            min="1"
            className="w-full bg-transparent border-gray-700 text-white"
          />
        </div>
        <div className="flex-1">
          <Select
            value={selectedLevel.toString()}
            onValueChange={(value) => setSelectedLevel(parseInt(value))}
          >
            <SelectTrigger className="w-full bg-transparent border-gray-700 text-white">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              {levels?.map((level) => (
                <SelectItem key={level.id} value={level.order_number.toString()}>
                  Level {level.order_number} ({level.title})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-white font-semibold">Import Questions from CSV</h3>
        <CsvUpload 
          onQuestionsImported={handleQuestionsImported}
          level={selectedLevel}
        />
      </div>

      <QuestionsList questions={questions} />

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="bg-transparent text-white border-gray-700 hover:bg-gray-800"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          {isSubmitting ? 'Saving...' : (editQuiz ? "Update Quiz" : "Create Quiz")}
        </Button>
      </div>
    </form>
  );
};