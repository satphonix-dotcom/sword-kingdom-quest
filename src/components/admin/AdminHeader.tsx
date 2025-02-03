import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { HomeLink } from "@/components/HomeLink";

interface AdminHeaderProps {
  onLogout: () => void;
  activeTab: 'users' | 'quizzes' | 'levels';
  setActiveTab: (tab: 'users' | 'quizzes' | 'levels') => void;
}

export const AdminHeader = ({ onLogout, activeTab, setActiveTab }: AdminHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <HomeLink />
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
          <Button
            variant={activeTab === 'levels' ? 'default' : 'outline'}
            onClick={() => setActiveTab('levels')}
          >
            Level Management
          </Button>
        </div>
        <Button 
          variant="outline" 
          onClick={onLogout}
          className="gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};