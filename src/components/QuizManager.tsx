import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { QuizForm } from "@/components/quiz/QuizForm";
import { QuizList } from "@/components/quiz/QuizList";
import { supabase } from "@/integrations/supabase/client";
import { Quiz } from "@/types/quiz";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const QuizManager = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);

  const { data: quizzes, refetch, isLoading, error } = useQuery({
    queryKey: ["quizzes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quizzes")
        .select(`
          *,
          questions!inner (
            id,
            question,
            correct_answer,
            options,
            quiz_id,
            level
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching quizzes:", error);
        throw error;
      }
      return data as Quiz[];
    },
  });

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

  const groupQuizzesByLevel = () => {
    if (!quizzes || !levels) return new Map();
    
    const groupedQuizzes = new Map();
    
    // Initialize map with all levels
    levels.forEach(level => {
      groupedQuizzes.set(level.order_number, {
        levelInfo: level,
        quizzes: []
      });
    });

    // Group quizzes by level
    quizzes.forEach(quiz => {
      const level = quiz.questions?.[0]?.level || 1;
      if (groupedQuizzes.has(level)) {
        groupedQuizzes.get(level).quizzes.push(quiz);
      }
    });

    return groupedQuizzes;
  };

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
        <div className="space-y-6">
          {Array.from(groupQuizzesByLevel()).map(([levelNumber, { levelInfo, quizzes: levelQuizzes }]) => (
            <Card key={levelNumber} className="border border-slate-200">
              <CardHeader>
                <CardTitle className="text-xl">
                  Level {levelNumber}: {levelInfo.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {levelQuizzes.length > 0 ? (
                  <QuizList
                    quizzes={levelQuizzes}
                    onQuizzesChange={refetch}
                    onEdit={handleEdit}
                  />
                ) : (
                  <p className="text-slate-500">No quizzes available for this level.</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};