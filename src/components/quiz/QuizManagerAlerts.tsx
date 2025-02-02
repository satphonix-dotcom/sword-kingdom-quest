import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface QuizManagerAlertsProps {
  isLoading: boolean;
  error: Error | null;
}

export const QuizManagerAlerts = ({ isLoading, error }: QuizManagerAlertsProps) => {
  if (isLoading) {
    return (
      <Alert>
        <AlertDescription>Loading quizzes...</AlertDescription>
      </Alert>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to fetch quizzes. Please try again.</AlertDescription>
      </Alert>
    );
  }

  return null;
};