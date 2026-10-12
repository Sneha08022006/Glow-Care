import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import SkinQuiz from '@/components/SkinQuiz';
import Recommendation from '@/components/Recommendation';
import About from '@/components/About';
import Reviews from '@/components/Reviews';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FaceScanner from '@/components/FaceScanner';
import Dashboard from '@/components/Dashboard';
import type { SkinType } from '@/data';

export default function App() {
  const [inferredSkinType, setInferredSkinType] = useState<SkinType | null>(null);

  return (
    <div className="min-h-screen bg-cream text-ink antialiased">
      <Navbar />
      <main>
        <Hero />
        <Products suggestedSkinType={inferredSkinType} />
        <SkinQuiz onComplete={setInferredSkinType} />
        <FaceScanner onComplete={setInferredSkinType} />
        <Dashboard
          currentSkinType={inferredSkinType}
          onReset={() => setInferredSkinType(null)}
        />
        <Recommendation suggestedSkinType={inferredSkinType} />
        <About />
        <Reviews />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
