import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Question } from "@/types/quiz";
import { supabase } from "@/integrations/supabase/client";

interface QuestionFormProps {
  onAddQuestion?: (question: Question) => void;
  quizId?: string;
  onBack?: () => void;
  level?: number;
}

export const QuestionForm = ({ onAddQuestion, quizId, onBack, level = 1 }: QuestionFormProps) => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [options, setOptions] = useState<string[]>(["", "", "", ""]);
  const [selectedLevel, setSelectedLevel] = useState<number>(level);

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

  const handleAddQuestion = async () => {
    if (!currentQuestion.trim() || !correctAnswer.trim() || options.some(opt => !opt.trim())) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    let targetQuizId = quizId;
    if (!targetQuizId) {
      const { data: quizData } = await supabase
        .from("quizzes")
        .select("id")
        .limit(1)
        .single();

      if (!quizData?.id) {
        toast({
          title: "Error",
          description: "No quiz found to add question to",
          variant: "destructive",
        });
        return;
      }
      targetQuizId = quizData.id;
    }

    const allOptions = [...options, correctAnswer].sort(() => Math.random() - 0.5);

    const question = {
      id: Math.random().toString(),
      question: currentQuestion,
      correct_answer: correctAnswer,
      options: allOptions,
      level: selectedLevel,
      quiz_id: targetQuizId
    };

    if (onAddQuestion) {
      onAddQuestion(question);
    }

    setCurrentQuestion("");
    setCorrectAnswer("");
    setOptions(["", "", "", ""]);
    setSelectedLevel(1);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Question"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          className="flex-1 bg-transparent border-gray-700 text-white"
        />
        <Select
          value={selectedLevel.toString()}
          onValueChange={(value) => setSelectedLevel(parseInt(value))}
        >
          <SelectTrigger className="w-[180px] bg-transparent border-gray-700 text-white">
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

      <div className="space-y-2">
        <Input
          placeholder="Correct Answer"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          className="border-green-600 bg-transparent text-white"
        />
        <p className="text-sm text-gray-400">This will be shuffled with other options</p>
      </div>

      {options.map((option, index) => (
        <Input
          key={index}
          placeholder={`Option ${index + 1}`}
          value={option}
          onChange={(e) => {
            const newOptions = [...options];
            newOptions[index] = e.target.value;
            setOptions(newOptions);
          }}
          className="bg-transparent border-gray-700 text-white"
        />
      ))}

      <div className="flex justify-between">
        {onBack && (
          <Button 
            variant="outline" 
            onClick={onBack}
            className="bg-transparent text-white border-gray-700 hover:bg-gray-800"
          >
            Back to Quiz
          </Button>
        )}
        <Button 
          onClick={handleAddQuestion}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Add Question
        </Button>
      </div>
    </div>
  );
};