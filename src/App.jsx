import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import CustomCursor from "@/components/ui/custom-cursor";
import Preloader from "@/components/ui/preloader";
import HomePage from "@/pages/home-page";
import AboutPage from "@/pages/about-page";
import ProjectsPage from "@/pages/projects-page";

export default function App() {
  return (
    <Router>
      <div className="bg-black min-h-screen text-foreground font-sans selection:bg-red-500/30 selection:text-white">
        <Preloader />
        <CustomCursor />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
