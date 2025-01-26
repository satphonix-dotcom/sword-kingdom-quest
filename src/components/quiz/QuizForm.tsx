import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Question, QuizFormProps } from "@/types/quiz";
import { QuizMetadata } from "./QuizMetadata";
import { QuizQuestions } from "./QuizQuestions";
import { QuizActions } from "./QuizActions";

interface Quiz {
  id?: string;
  title: string;
  description: string | null;
}

interface ExtendedQuizFormProps extends QuizFormProps {
  editQuiz?: Quiz;
}

export const QuizForm = ({ userId, onSuccess, onCancel, editQuiz }: ExtendedQuizFormProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const loadQuizData = async () => {
      if (editQuiz) {
        setTitle(editQuiz.title);
        setDescription(editQuiz.description || "");

        // Fetch questions for this quiz
        const { data: quizQuestions, error } = await supabase
          .from("questions")
          .select("*")
          .eq("quiz_id", editQuiz.id);

        if (error) {
          toast({
            title: "Error",
            description: "Failed to load quiz questions",
            variant: "destructive",
          });
          return;
        }

        // Transform the data to match the Question interface
        const transformedQuestions: Question[] = quizQuestions.map(q => ({
          id: q.id,
          question: q.question,
          correct_answer: q.correct_answer,
          options: Array.isArray(q.options) ? q.options.map(opt => String(opt)) : [], // Convert each option to string
          level: q.level,
          quiz_id: q.quiz_id
        }));

        setQuestions(transformedQuestions);
      }
    };

    loadQuizData();
  }, [editQuiz]);

  const handleSubmit = async () => {
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

    try {
      if (editQuiz) {
        // Update existing quiz
        const { error: quizError } = await supabase
          .from("quizzes")
          .update({
            title,
            description,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editQuiz.id);

        if (quizError) throw quizError;

        // Delete existing questions
        const { error: deleteError } = await supabase
          .from("questions")
          .delete()
          .eq("quiz_id", editQuiz.id);

        if (deleteError) throw deleteError;

        // Insert new questions
        const { error: questionsError } = await supabase
          .from("questions")
          .insert(
            questions.map(q => ({
              quiz_id: editQuiz.id,
              question: q.question,
              correct_answer: q.correct_answer,
              options: q.options,
              level: q.level
            }))
          );

        if (questionsError) throw questionsError;

      } else {
        // Create new quiz
        const { data: quizData, error: quizError } = await supabase
          .from("quizzes")
          .insert({
            title,
            description,
            created_by: userId
          })
          .select()
          .single();

        if (quizError) throw quizError;

        const { error: questionsError } = await supabase
          .from("questions")
          .insert(
            questions.map(q => ({
              quiz_id: quizData.id,
              question: q.question,
              correct_answer: q.correct_answer,
              options: q.options,
              level: q.level
            }))
          );

        if (questionsError) throw questionsError;
      }

      toast({
        title: "Success",
        description: `Quiz ${editQuiz ? 'updated' : 'created'} successfully`,
      });

      onSuccess();
    } catch (error) {
      console.error("Error saving quiz:", error);
      toast({
        title: "Error",
        description: `Failed to ${editQuiz ? 'update' : 'create'} quiz`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <QuizMetadata
        title={title}
        description={description}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
      />
      <QuizQuestions 
        questions={questions}
        onQuestionsChange={setQuestions}
      />
      <QuizActions 
        onCancel={onCancel}
        onSubmit={handleSubmit}
      />
    </div>
  );
};