import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Question } from "@/types/quiz";

interface QuestionFormProps {
  onAddQuestion: (question: Question) => void;
}

export const QuestionForm = ({ onAddQuestion }: QuestionFormProps) => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [options, setOptions] = useState<string[]>(["", "", "", ""]);
  const [level, setLevel] = useState<number>(1);

  const handleAddQuestion = () => {
    if (!currentQuestion.trim() || !correctAnswer.trim() || options.some(opt => !opt.trim())) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    const allOptions = [...options, correctAnswer].sort(() => Math.random() - 0.5);

    onAddQuestion({
      id: Math.random().toString(),
      question: currentQuestion,
      correct_answer: correctAnswer,
      options: allOptions,
      level
    });

    setCurrentQuestion("");
    setCorrectAnswer("");
    setOptions(["", "", "", ""]);
    setLevel(1);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Add Questions</h3>
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Question"
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
          />
        </div>
        <Select
          value={level.toString()}
          onValueChange={(value) => setLevel(parseInt(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Level 1 (Beginner)</SelectItem>
            <SelectItem value="2">Level 2 (Intermediate)</SelectItem>
            <SelectItem value="3">Level 3 (Advanced)</SelectItem>
          </SelectContent>
        </Select>
      </div>
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