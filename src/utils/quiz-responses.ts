import { supabase } from "@/integrations/supabase/client";
import { Question } from "@/types/quiz";

interface QuizResponse {
  quiz_id: string;
  user_id: string;
  answers: Array<{
    question_id: string;
    selected_answer: string | null;
  }>;
  score: number;
}

export const getExistingResponse = async (quizId: string, userId: string) => {
  const { data: existingResponse } = await supabase
    .from("quiz_responses")
    .select("id, score")
    .eq("quiz_id", quizId)
    .eq("user_id", userId)
    .maybeSingle();
    
  return existingResponse;
};

export const updateQuizResponse = async (
  responseId: string,
  questions: Question[],
  currentQuestionIndex: number,
  selectedAnswer: string | null,
  finalScore: number
) => {
  console.log("Updating existing response...");
  return await supabase
    .from("quiz_responses")
    .update({
      answers: questions.map((q, i) => ({
        question_id: q.id,
        selected_answer: i === currentQuestionIndex ? selectedAnswer : null
      })),
      score: finalScore,
      completed_at: new Date().toISOString()
    })
    .eq("id", responseId);
};

export const createQuizResponse = async (
  quizId: string,
  userId: string,
  questions: Question[],
  currentQuestionIndex: number,
  selectedAnswer: string | null,
  finalScore: number
) => {
  console.log("Creating new quiz response...");
  return await supabase
    .from("quiz_responses")
    .insert({
      quiz_id: quizId,
      user_id: userId,
      answers: questions.map((q, i) => ({
        question_id: q.id,
        selected_answer: i === currentQuestionIndex ? selectedAnswer : null
      })),
      score: finalScore
    });
};