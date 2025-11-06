// app/page.tsx
import HeroSection from "./components/home/hero";
import About from "./components/home/about";
import Rooms from "./components/home/rooms";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <About />
      <Rooms />

      {/* other sections */}
    </main>
  );
}
