import React from 'react';
import { Button } from '@/components/ui/button';
import { ShareButton } from './ShareButton';

interface QuizCompleteProps {
  score: number;
  totalQuestions: number;
  level: number;
  onBack: () => void;
}

export const QuizComplete = ({ score, totalQuestions, level, onBack }: QuizCompleteProps) => {
  const percentage = (score / totalQuestions) * 100;
  
  return (
    <div className="space-y-6 text-center">
      <h3 className="text-2xl font-bold">Quiz Complete!</h3>
      
      <div className="p-6 bg-gameSlate/10 rounded-lg">
        <p className="text-4xl font-bold text-gameGold mb-2">
          {score}/{totalQuestions}
        </p>
        <p className="text-lg text-gray-300">
          {percentage >= 70 ? '🎉 Great job!' : '📚 Keep practicing!'}
        </p>
      </div>

      <ShareButton 
        score={score}
        totalQuestions={totalQuestions}
        level={level}
      />

      <Button 
        onClick={onBack} 
        variant="outline" 
        className="w-full"
      >
        Back to Levels
      </Button>
    </div>
  );
};