import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Question, QuizFormProps } from "@/types/quiz";
import { QuizMetadata } from "./QuizMetadata";
import { QuizQuestions } from "./QuizQuestions";
import { QuizActions } from "./QuizActions";

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
      options: q.options,
      level: q.level
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
        onSubmit={handleCreateQuiz}
      />
    </div>
  );
};