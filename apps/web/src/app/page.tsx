import HeroSection from '@/components/home/HeroSection';
import ValuePropositions from '@/components/home/ValuePropositions';
import CategoryGrid from '@/components/home/CategoryGrid';
import AboutPreview from '@/components/home/AboutPreview';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ValuePropositions />
      <CategoryGrid />
      <AboutPreview />
    </>
  );
}
