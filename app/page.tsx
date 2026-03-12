import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Domains from "@/components/Domains";
import Projects from "@/components/Projects";
import Events from "@/components/Events";
import Team from "@/components/Team";
import Terminal from "@/components/Terminal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <About />
      <Domains />
      <Projects />
      <Events />
      <Team />
      <Terminal />
      <Footer />
    </main>
  );
}
