import { Button } from "@/components/ui/button";
import { Question } from "@/types/quiz";
import { cn } from "@/lib/utils";

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  onNext: () => void;
  onBack: () => void;
  isLastQuestion: boolean;
  showingAnswer: boolean;
}

export const QuizQuestion = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onBack,
  isLastQuestion,
  showingAnswer,
}: QuizQuestionProps) => {
  // Filter out empty options and remove duplicates
  const validOptions = Array.from(new Set(question.options.filter(option => option && option.trim() !== '')));

  const getOptionClassName = (option: string) => {
    if (!showingAnswer) {
      return selectedAnswer === option 
        ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
        : 'bg-background hover:bg-accent/10 text-foreground';
    }

    if (option === question.correct_answer) {
      return 'bg-green-600 hover:bg-green-700 text-white';
    }

    if (selectedAnswer === option && option !== question.correct_answer) {
      return 'bg-red-600 hover:bg-red-700 text-white';
    }

    return 'bg-background hover:bg-accent/10 text-foreground';
  };

  return (
    <div className="space-y-4">
      <div className="p-6 rounded-lg shadow-lg bg-white">
        <p className="text-lg font-medium mb-4 text-gameSlate">{question.question}</p>
        <div className="space-y-2">
          {validOptions.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswer === option ? "default" : "outline"}
              className={cn(
                "w-full justify-start text-left",
                getOptionClassName(option)
              )}
              onClick={() => !showingAnswer && onAnswerSelect(option)}
              disabled={showingAnswer}
            >
              {option}
            </Button>
          ))}
        </div>
        {showingAnswer && (
          <div className="mt-4 p-4 bg-slate-100 rounded-lg">
            <p className="text-sm text-slate-700">
              {selectedAnswer === question.correct_answer 
                ? "✅ Correct! Well done!"
                : `❌ Incorrect. The correct answer is: ${question.correct_answer}`
              }
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          Exit Quiz
        </Button>
        <Button onClick={onNext} disabled={!selectedAnswer}>
          {showingAnswer ? (isLastQuestion ? "Finish" : "Next Question") : "Check Answer"}
        </Button>
      </div>
    </div>
  );
};