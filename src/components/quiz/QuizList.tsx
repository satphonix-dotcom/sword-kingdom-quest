import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Quiz {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
}

interface QuizListProps {
  quizzes: Quiz[];
  onQuizzesChange: () => void;
  onEdit: (quiz: Quiz) => void;
}

export const QuizList = ({ quizzes, onQuizzesChange, onEdit }: QuizListProps) => {
  const { toast } = useToast();

  const handleDeleteQuiz = async (quizId: string) => {
    const { error } = await supabase
      .from("quizzes")
      .delete()
      .eq("id", quizId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete quiz",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Quiz deleted successfully",
    });

    onQuizzesChange();
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {quizzes.map((quiz) => (
          <TableRow key={quiz.id}>
            <TableCell>{quiz.title}</TableCell>
            <TableCell>{quiz.description}</TableCell>
            <TableCell>{new Date(quiz.created_at).toLocaleDateString()}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => onEdit(quiz)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteQuiz(quiz.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};