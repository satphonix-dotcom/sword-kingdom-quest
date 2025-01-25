import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";

interface Quiz {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
}

interface Question {
  id: string;
  question: string;
  correct_answer: string;
  options: string[];
}

export const QuizManager = () => {
  const { toast } = useToast();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [options, setOptions] = useState<string[]>(["", "", "", ""]);

  const fetchQuizzes = async () => {
    const { data, error } = await supabase
      .from("quizzes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch quizzes",
        variant: "destructive",
      });
      return;
    }

    setQuizzes(data || []);
  };

  const handleCreateQuiz = async () => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Quiz title is required",
        variant: "destructive",
      });
      return;
    }

    if (questions.length === 0) {
      toast({
        title: "Error",
        description: "Add at least one question",
        variant: "destructive",
      });
      return;
    }

    const { data: quizData, error: quizError } = await supabase
      .from("quizzes")
      .insert([{ title, description }])
      .select()
      .single();

    if (quizError) {
      toast({
        title: "Error",
        description: "Failed to create quiz",
        variant: "destructive",
      });
      return;
    }

    const questionsWithQuizId = questions.map(q => ({
      quiz_id: quizData.id,
      question: q.question,
      correct_answer: q.correct_answer,
      options: q.options
    }));

    const { error: questionsError } = await supabase
      .from("questions")
      .insert(questionsWithQuizId);

    if (questionsError) {
      toast({
        title: "Error",
        description: "Failed to add questions",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Quiz created successfully",
    });

    setShowQuizForm(false);
    setTitle("");
    setDescription("");
    setQuestions([]);
    fetchQuizzes();
  };

  const handleAddQuestion = () => {
    if (!currentQuestion.trim() || !correctAnswer.trim() || options.some(opt => !opt.trim())) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    setQuestions([...questions, {
      id: Math.random().toString(),
      question: currentQuestion,
      correct_answer: correctAnswer,
      options: options
    }]);

    setCurrentQuestion("");
    setCorrectAnswer("");
    setOptions(["", "", "", ""]);
  };

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

    fetchQuizzes();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quiz Management</h2>
        <Button onClick={() => setShowQuizForm(!showQuizForm)}>
          <Plus className="mr-2" />
          Create Quiz
        </Button>
      </div>

      {showQuizForm && (
        <div className="space-y-4 p-4 border rounded-lg">
          <Input
            placeholder="Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Quiz Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="space-y-4 mt-4">
            <h3 className="font-semibold">Add Questions</h3>
            <Input
              placeholder="Question"
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
            />
            <Input
              placeholder="Correct Answer"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
            />
            {options.map((option, index) => (
              <Input
                key={index}
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
              />
            ))}
            <Button onClick={handleAddQuestion}>Add Question</Button>
          </div>

          {questions.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold">Added Questions:</h4>
              <ul className="list-disc pl-5">
                {questions.map((q, index) => (
                  <li key={q.id}>{q.question}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowQuizForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateQuiz}>Create Quiz</Button>
          </div>
        </div>
      )}

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
                  <Button variant="outline" size="icon">
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
    </div>
  );
};