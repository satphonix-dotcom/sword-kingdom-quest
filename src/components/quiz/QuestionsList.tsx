interface Question {
  id: string;
  question: string;
  correct_answer: string;
  options: string[];
}

interface QuestionsListProps {
  questions: Question[];
}

export const QuestionsList = ({ questions }: QuestionsListProps) => {
  if (questions.length === 0) return null;

  return (
    <div className="mt-4">
      <h4 className="font-semibold">Added Questions:</h4>
      <ul className="list-disc pl-5">
        {questions.map((q) => (
          <li key={q.id}>{q.question}</li>
        ))}
      </ul>
    </div>
  );
};