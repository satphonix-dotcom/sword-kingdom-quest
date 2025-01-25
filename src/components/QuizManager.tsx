import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { QuizForm } from "./quiz/QuizForm";
import { QuizList } from "./quiz/QuizList";

interface Quiz {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
}

export const QuizManager = () => {
  const { toast } = useToast();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchCurrentUser();
    fetchQuizzes();
  }, []);

  const fetchCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUserId(user.id);
    }
  };

  const fetchQuizzes = async () => {
    const { data, error } = await supabase
      .from("quizzes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch quizzes",
        variant: "destructive",
      });
      return;
    }

    setQuizzes(data || []);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quiz Management</h2>
        <Button onClick={() => setShowQuizForm(!showQuizForm)}>
          <Plus className="mr-2" />
          Create Quiz
        </Button>
      </div>

      {showQuizForm ? (
        <QuizForm
          userId={userId}
          onSuccess={() => {
            setShowQuizForm(false);
            fetchQuizzes();
          }}
          onCancel={() => setShowQuizForm(false)}
        />
      ) : (
        <QuizList quizzes={quizzes} onQuizzesChange={fetchQuizzes} />
      )}
    </div>
  );
};