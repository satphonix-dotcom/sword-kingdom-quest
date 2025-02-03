import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { EditProfileForm } from '@/components/EditProfileForm';
import { HomeLink } from '@/components/HomeLink';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      setLoading(true);
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
        throw error;
      }

      if (!data) {
        toast({
          title: "Profile not found",
          description: "Unable to load your profile data",
          variant: "destructive",
        });
        return;
      }

      setProfile(data);
    } catch (error: any) {
      console.error('Profile loading error:', error);
      toast({
        title: "Error loading profile",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
        {profile ? (
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