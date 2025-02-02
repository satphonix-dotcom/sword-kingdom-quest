import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { LevelContent } from '@/components/LevelContent';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { HomeLink } from '@/components/HomeLink';

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: quiz, isLoading } = useQuery({
    queryKey: ['quiz', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quizzes')
        .select(`
          *,
          questions (*)
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch quiz",
          variant: "destructive",
        });
        throw error;
      }

      return data;
    },
  });

  const handleBack = () => {
    navigate('/levels');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <HomeLink />
        <Card className="w-full max-w-2xl mx-auto mt-8">
          <CardContent className="p-6">
            <p className="text-center">Loading quiz...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="container mx-auto px-4 py-8">
        <HomeLink />
        <Card className="w-full max-w-2xl mx-auto mt-8">
          <CardContent className="p-6">
            <p className="text-center">Quiz not found</p>
            <Button onClick={handleBack} className="mt-4 w-full">
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <HomeLink />
      <LevelContent
        level={quiz.questions[0]?.level || 1}
        onBack={handleBack}
        quizId={quiz.id}
      />
    </div>
  );
};

export default Quiz;