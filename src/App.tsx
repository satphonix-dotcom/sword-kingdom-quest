import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import About from "./pages/About";
import LeaderboardPage from "./pages/LeaderboardPage";
import StudyGuide from "./pages/StudyGuide";
import FAQ from "./pages/FAQ";
import Support from "./pages/Support";
import Privacy from "./pages/Privacy";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/study-guide" element={<StudyGuide />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/support" element={<Support />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </Router>
  );
}

export default App;