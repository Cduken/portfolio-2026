import CustomCursor from "../components/CustomCursor";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Gallery from "../components/Gallery";
import Contact from "../components/Contact";

import ChatBot from "../chatWidget";

const Index = () => {
  return (
    <div className="relative">
      <CustomCursor />
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Gallery />
      <Contact />

      <ChatBot />
    </div>
  );
};

export default Index;
