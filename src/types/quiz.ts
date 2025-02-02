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
  editQuiz?: Quiz;
}

export interface Quiz {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
  time_limit: number | null;
  points: number;
  questions?: Question[];
  created_by: string;
  updated_at: string;
}

export interface Level {
  id: string;
  order_number: number;
  title: string;
  description: string | null;
  points: number;
  is_locked: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
}