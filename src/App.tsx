import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import Levels from '@/pages/Levels';
import Quiz from '@/pages/Quiz';
import Profile from '@/pages/Profile';
import About from '@/pages/About';
import LeaderboardPage from '@/pages/LeaderboardPage';
import FAQ from '@/pages/FAQ';
import LearnMore from '@/pages/LearnMore';
import Privacy from '@/pages/Privacy';
import Support from '@/pages/Support';
import StudyGuide from '@/pages/StudyGuide';
import Admin from '@/pages/Admin';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/levels" element={<Levels />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/support" element={<Support />} />
        <Route path="/study-guide" element={<StudyGuide />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;