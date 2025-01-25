export interface Question {
  id: string;
  question: string;
  correct_answer: string;
  options: string[];
  level: number;
  quiz_id: string;
}

export interface QuizFormProps {
  userId: string | null;
  onSuccess: () => void;
  onCancel: () => void;
}