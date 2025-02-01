import { Button } from "@/components/ui/button";
import { Question } from "@/types/quiz";

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  onNext: () => void;
  onBack: () => void;
  isLastQuestion: boolean;
}

export const QuizQuestion = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onBack,
  isLastQuestion,
}: QuizQuestionProps) => {
  return (
    <div className="space-y-4">
      <div className="p-6 rounded-lg shadow-lg bg-white">
        <p className="text-lg font-medium mb-4 text-gameSlate">{question.question}</p>
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswer === option ? "default" : "outline"}
              className="w-full justify-start text-left hover:bg-gray-100 transition-colors"
              onClick={() => onAnswerSelect(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          Exit Quiz
        </Button>
        <Button onClick={onNext} disabled={!selectedAnswer}>
          {isLastQuestion ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
};