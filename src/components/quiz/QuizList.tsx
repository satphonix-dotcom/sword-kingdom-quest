import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

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

  // Fetch questions for each quiz to get their levels
  const { data: quizLevels } = useQuery({
    queryKey: ["quizLevels"],
    queryFn: async () => {
      const { data: questions, error } = await supabase
        .from("questions")
        .select("quiz_id, level");

      if (error) {
        console.error("Error fetching quiz levels:", error);
        return {};
      }

      // Group questions by quiz_id and get unique levels
      const levelsByQuiz = questions.reduce((acc: Record<string, Set<number>>, q) => {
        if (!acc[q.quiz_id]) {
          acc[q.quiz_id] = new Set();
        }
        acc[q.quiz_id].add(q.level);
        return acc;
      }, {});

      // Convert Sets to sorted arrays
      return Object.fromEntries(
        Object.entries(levelsByQuiz).map(([quizId, levels]) => [
          quizId,
          Array.from(levels).sort((a, b) => a - b)
        ])
      );
    },
  });

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

  const getLevelBadges = (quizId: string) => {
    if (!quizLevels || !quizLevels[quizId]) return null;
    
    return (
      <div className="flex gap-1">
        {quizLevels[quizId].map((level) => (
          <span
            key={level}
            className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-slate-200"
          >
            Level {level}
          </span>
        ))}
      </div>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Levels</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {quizzes.map((quiz) => (
          <TableRow key={quiz.id}>
            <TableCell>{quiz.title}</TableCell>
            <TableCell>{quiz.description}</TableCell>
            <TableCell>{getLevelBadges(quiz.id)}</TableCell>
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