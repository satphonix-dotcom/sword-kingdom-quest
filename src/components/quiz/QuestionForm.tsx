import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  question: string;
  correct_answer: string;
  options: string[];
}

interface QuestionFormProps {
  onAddQuestion: (question: Question) => void;
}

export const QuestionForm = ({ onAddQuestion }: QuestionFormProps) => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [options, setOptions] = useState<string[]>(["", "", "", ""]);

  const handleAddQuestion = () => {
    if (!currentQuestion.trim() || !correctAnswer.trim() || options.some(opt => !opt.trim())) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    // Create a new array with all options including the correct answer
    const allOptions = [...options, correctAnswer].sort(() => Math.random() - 0.5);

    onAddQuestion({
      id: Math.random().toString(),
      question: currentQuestion,
      correct_answer: correctAnswer,
      options: allOptions
    });

    setCurrentQuestion("");
    setCorrectAnswer("");
    setOptions(["", "", "", ""]);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Add Questions</h3>
      <Input
        placeholder="Question"
        value={currentQuestion}
        onChange={(e) => setCurrentQuestion(e.target.value)}
      />
      <div className="space-y-2">
        <Input
          placeholder="Correct Answer"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          className="border-green-500"
        />
        <p className="text-sm text-muted-foreground">This will be shuffled with other options</p>
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
        />
      ))}
      <Button onClick={handleAddQuestion}>Add Question</Button>
    </div>
  );
};