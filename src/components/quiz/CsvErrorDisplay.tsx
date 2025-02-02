import { Alert, AlertDescription } from "@/components/ui/alert";

interface CsvErrorDisplayProps {
  error: string | null;
}

export const CsvErrorDisplay = ({ error }: CsvErrorDisplayProps) => {
  if (!error) return null;

  return (
    <Alert variant="destructive">
      <AlertDescription className="whitespace-pre-line">
        {error}
      </AlertDescription>
    </Alert>
  );
};