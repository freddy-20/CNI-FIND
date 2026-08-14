import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import AnimatedBackground from "@/components/shared/AnimatedBackground";

export default function HomePage() {
  return (
    <div className="relative">
      <AnimatedBackground />
      <Hero />
      <HowItWorks />
    </div>
  );
}
