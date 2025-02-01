import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { QuizManager } from "@/components/QuizManager";
import { UserManagement } from "@/components/admin/UserManagement";
import { LogOut } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const [currentUserIsAdmin, setCurrentUserIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<'users' | 'quizzes'>('users');
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="space-x-2">
            <Button
              variant={activeTab === 'users' ? 'default' : 'outline'}
              onClick={() => setActiveTab('users')}
            >
              User Management
            </Button>
            <Button
              variant={activeTab === 'quizzes' ? 'default' : 'outline'}
              onClick={() => setActiveTab('quizzes')}
            >
              Quiz Management
            </Button>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
      
      {activeTab === 'users' ? (
        <UserManagement />
      ) : (
        <QuizManager />
      )}
    </div>
  );
};

export default Admin;