import MultiDivisionHero from '@/components/home/MultiDivisionHero';
import DivisionsSection from '@/components/home/DivisionsSection';
import TrustBar from '@/components/home/TrustBar';
import AboutPreview from '@/components/home/AboutPreview';

export default function HomePage() {
  return (
    <>
      <MultiDivisionHero />
      <DivisionsSection />
      <TrustBar />
      <AboutPreview />
    </>
  );
}
