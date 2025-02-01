import React from 'react';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface ShareButtonProps {
  score: number;
  totalQuestions: number;
  level: number;
}

export const ShareButton = ({ score, totalQuestions, level }: ShareButtonProps) => {
  const shareText = `🎮 I just scored ${score}/${totalQuestions} on Level ${level} in the Biblical Warfare Quiz! Join me in this epic journey through scripture! 📖✨`;
  const shareUrl = window.location.href;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Biblical Warfare Quiz',
          text: shareText,
          url: shareUrl,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        toast({
          title: "Link copied!",
          description: "Share link has been copied to your clipboard",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: "Sharing failed",
        description: "Unable to share content",
        variant: "destructive",
      });
    }
  };

  return (
    <Button 
      onClick={handleShare}
      className="w-full mt-4 bg-gameGold text-gamePurple hover:bg-gameGold/90"
    >
      <Share2 className="mr-2 h-4 w-4" />
      Share Your Achievement
    </Button>
  );
};