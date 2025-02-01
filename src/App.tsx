import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import Levels from '@/pages/Levels';
import Quiz from '@/pages/Quiz';
import Profile from '@/pages/Profile';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/levels" element={<Levels />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;