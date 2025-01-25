interface Question {
  id: string;
  question: string;
  correct_answer: string;
  options: string[];
  level: number;
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
          <li key={q.id} className="mb-2">
            <span className="inline-flex items-center gap-2">
              <span className="text-sm font-medium px-2 py-1 bg-slate-200 rounded-full">
                Level {q.level}
              </span>
              {q.question}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};