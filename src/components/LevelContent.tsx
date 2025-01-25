import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Question } from "@/types/quiz";

interface LevelContentProps {
  level: number;
  onBack: () => void;
}

export const LevelContent = ({ level, onBack }: LevelContentProps) => {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  React.useEffect(() => {
    fetchQuestions();
  }, [level]);

  const fetchQuestions = async () => {
    const { data, error } = await supabase
      .from("questions")
      .select("*")
      .eq("level", level)
      .order("created_at");

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch questions",
        variant: "destructive",
      });
      return;
    }

    // Transform the data to match our Question interface
    const transformedQuestions: Question[] = (data || []).map(q => ({
      id: q.id,
      question: q.question,
      correct_answer: q.correct_answer,
      options: Array.isArray(q.options) ? q.options.map(opt => String(opt)) : [],
      level: q.level,
      quiz_id: q.quiz_id
    }));

    setQuestions(transformedQuestions);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = async () => {
    if (!selectedAnswer) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex === questions.length - 1) {
      // Quiz complete
      setIsQuizComplete(true);
      
      // Save quiz response
      const { error } = await supabase.from("quiz_responses").insert({
        quiz_id: currentQuestion.quiz_id,
        user_id: (await supabase.auth.getUser()).data.user?.id,
        answers: questions.map((q, i) => ({
          question_id: q.id,
          selected_answer: i === currentQuestionIndex ? selectedAnswer : null
        })),
        score: score + (isCorrect ? 1 : 0)
      });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to save quiz response",
          variant: "destructive",
        });
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    }
  };

  if (questions.length === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardContent className="p-6">
          <p className="text-center">No questions available for this level yet.</p>
          <Button onClick={onBack} className="mt-4 w-full">
            Go Back
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Level {level}</span>
          <span className="text-sm">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {isQuizComplete ? (
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Quiz Complete!</h3>
            <p className="text-xl">
              Your score: {score} out of {questions.length}
            </p>
            <Button onClick={onBack} className="mt-4">
              Return to Levels
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-lg font-medium mb-4">{currentQuestion.question}</p>
            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === option ? "default" : "outline"}
                  className="w-full justify-start text-left"
                  onClick={() => handleAnswerSelect(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={onBack}>
                Exit Quiz
              </Button>
              <Button
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
              >
                {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
