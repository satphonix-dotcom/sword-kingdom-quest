import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { EditProfileForm } from '@/components/EditProfileForm';
import { HomeLink } from '@/components/HomeLink';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, AlertCircle, WifiOff } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const getProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Not authenticated",
          description: "Please sign in to view your profile",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        if (error.code === 'PGRST116') {
          setError('Unable to connect to the server. Please check your internet connection and try again.');
        } else {
          setError(error.message);
        }
        return;
      }

      if (!data) {
        setError("Profile not found");
        return;
      }

      setProfile(data);
    } catch (error: any) {
      console.error('Profile loading error:', error);
      setError('Unable to connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleRetry = () => {
    getProfile();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gamePurple to-gameSlate p-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-gameGold" />
          <p className="text-gameGold">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gamePurple to-gameSlate p-8">
      <HomeLink />
      <div className="max-w-2xl mx-auto mt-16">
        <h1 className="text-3xl font-bold text-gameGold mb-8">Edit Profile</h1>
        
        {error ? (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Connection Error</AlertTitle>
            <AlertDescription className="mt-2">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <WifiOff className="h-4 w-4" />
                  <span>{error}</span>
                </div>
                <Button 
                  onClick={handleRetry}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Try Again
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        ) : profile ? (
          <EditProfileForm
            profile={profile}
            userId={profile.id}
            onSuccess={getProfile}
            onCancel={() => navigate('/')}
          />
        ) : (
          <div className="text-center text-white">
            <p>Unable to load profile data. Please try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;