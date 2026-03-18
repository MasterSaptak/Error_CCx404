import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GameDevExperience from "@/components/GameDevExperience";
import MiniGameZone from "@/components/MiniGameZone";
import About from "@/components/About";
import Domains from "@/components/Domains";
import Projects from "@/components/Projects";
import IdeaLab from "@/components/IdeaLab";
import Events from "@/components/Events";
import Team from "@/components/Team";
import Terminal from "@/components/Terminal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <GameDevExperience />
      <MiniGameZone />
      <About />
      <Domains />
      <Projects />
      <IdeaLab />
      <Events />
      <Team />
      <Terminal />
      <Footer />
    </main>
  );
}
