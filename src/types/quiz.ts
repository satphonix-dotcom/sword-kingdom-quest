export interface Question {
  id: string;
  question: string;
  correct_answer: string;
  options: string[];
  level: number;
}

export interface QuizFormProps {
  userId: string | null;
  onSuccess: () => void;
  onCancel: () => void;
}