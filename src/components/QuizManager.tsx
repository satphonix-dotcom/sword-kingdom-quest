import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { QuizForm } from "@/components/quiz/QuizForm";
import { QuizList } from "@/components/quiz/QuizList";
import { supabase } from "@/integrations/supabase/client";
import { Quiz } from "@/types/quiz";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export const QuizManager = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);

  const { data: quizzes, refetch, isLoading, error } = useQuery({
    queryKey: ["quizzes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quizzes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching quizzes:", error);
        throw error;
      }
      return data as Quiz[];
    },
  });

  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
  });

  const handleQuizCreated = () => {
    setShowForm(false);
    setEditingQuiz(null);
    refetch();
  };

  const handleEdit = (quiz: Quiz) => {
    setEditingQuiz(quiz);
    setShowForm(true);
  };

  if (showForm) {
    return (
      <QuizForm
        userId={session?.user?.id || null}
        onSuccess={handleQuizCreated}
        onCancel={() => {
          setShowForm(false);
          setEditingQuiz(null);
        }}
        editQuiz={editingQuiz || undefined}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quizzes</h2>
        <Button onClick={() => setShowForm(true)}>Create Quiz</Button>
      </div>

      {isLoading && (
        <Alert>
          <AlertDescription>Loading quizzes...</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to fetch quizzes. Please try again.</AlertDescription>
        </Alert>
      )}

      {quizzes && !isLoading && !error && (
        <QuizList
          quizzes={quizzes}
          onQuizzesChange={refetch}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};