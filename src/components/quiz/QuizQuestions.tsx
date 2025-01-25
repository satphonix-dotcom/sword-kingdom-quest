import { Question } from "@/types/quiz";
import { CsvUpload } from "./CsvUpload";
import { QuestionForm } from "./QuestionForm";
import { QuestionsList } from "./QuestionsList";

interface QuizQuestionsProps {
  questions: Question[];
  onQuestionsChange: (questions: Question[]) => void;
}

export const QuizQuestions = ({ questions, onQuestionsChange }: QuizQuestionsProps) => {
  return (
    <div className="space-y-4">
      <CsvUpload 
        onQuestionsImported={(newQuestions) => 
          onQuestionsChange([...questions, ...newQuestions])
        } 
      />
      <QuestionForm 
        onAddQuestion={(question) => 
          onQuestionsChange([...questions, question])
        } 
      />
      <QuestionsList questions={questions} />
    </div>
  );
};