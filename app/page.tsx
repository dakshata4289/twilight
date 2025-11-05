// app/page.tsx
import HeroSection from "./components/home/hero";
import About from "./components/home/about";
import Services from "./components/home/services";
import Rooms from "./components/home/rooms";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <About />
      <Services />
      <Rooms />
   
      {/* other sections */}
    </main>
  );
}
