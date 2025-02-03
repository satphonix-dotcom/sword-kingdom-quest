import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { QuizManager } from "@/components/QuizManager";
import { UserManagement } from "@/components/admin/UserManagement";
import { LevelManager } from "@/components/admin/LevelManager";
import { AdminHeader } from "@/components/admin/AdminHeader";

const Admin = () => {
  const navigate = useNavigate();
  const [currentUserIsAdmin, setCurrentUserIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<'users' | 'quizzes' | 'levels'>('users');
  const { toast } = useToast();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/auth');
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    if (!profile?.is_admin) {
      navigate('/');
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges",
        variant: "destructive",
      });
      return;
    }

    setCurrentUserIsAdmin(true);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
      return;
    }
    navigate('/auth');
  };

  if (!currentUserIsAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <AdminHeader 
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      {activeTab === 'users' && <UserManagement />}
      {activeTab === 'quizzes' && <QuizManager />}
      {activeTab === 'levels' && <LevelManager />}
    </div>
  );
};

export default Admin;