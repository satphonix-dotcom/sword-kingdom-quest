import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { QuizForm } from "@/components/quiz/QuizForm";
import { QuizGroupCard } from "@/components/quiz/QuizGroupCard";
import { QuizManagerHeader } from "@/components/quiz/QuizManagerHeader";
import { QuizManagerAlerts } from "@/components/quiz/QuizManagerAlerts";
import { supabase } from "@/integrations/supabase/client";
import { Quiz } from "@/types/quiz";

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
    
    levels.forEach(level => {
      groupedQuizzes.set(level.order_number, {
        levelInfo: level,
        quizzes: []
      });
    });

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
      <QuizManagerHeader onCreateClick={() => setShowForm(true)} />
      <QuizManagerAlerts isLoading={isLoading} error={error as Error} />

      {quizzes && !isLoading && !error && (
        <div className="space-y-6">
          {Array.from(groupQuizzesByLevel()).map(([levelNumber, { levelInfo, quizzes: levelQuizzes }]) => (
            <QuizGroupCard
              key={levelNumber}
              levelNumber={levelNumber}
              levelTitle={levelInfo.title}
              quizzes={levelQuizzes}
              onQuizzesChange={refetch}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};