import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { EditProfileForm } from '@/components/EditProfileForm';
import { HomeLink } from '@/components/HomeLink';
import { useToast } from '@/components/ui/use-toast';

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
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      toast({
        title: "Error loading profile",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gamePurple to-gameSlate p-8">
      <HomeLink />
      <div className="max-w-2xl mx-auto mt-16">
        <h1 className="text-3xl font-bold text-gameGold mb-8">Edit Profile</h1>
        {profile && (
          <EditProfileForm
            profile={profile}
            userId={profile.id}
            onSuccess={getProfile}
            onCancel={() => navigate('/')}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;