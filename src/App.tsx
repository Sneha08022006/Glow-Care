import { useState, useEffect } from 'react';
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
import LumiereSection from '@/components/LumiereSection';
import LumiereAuthModal from '@/components/LumiereAuthModal';
import type { SkinType } from '@/data';

export default function App() {
  const [inferredSkinType, setInferredSkinType] = useState<SkinType | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('glowcare_user');
      if (saved) {
        setCurrentUser(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to parse saved user', e);
    }
  }, []);

  const handleAuthSuccess = (user: { name: string; email: string }) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('glowcare_user');
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-[#FFFDFB] text-[#3A2E2B] antialiased selection:bg-[#F7E5E8] selection:text-[#9E4F63]">
      <Navbar
        onOpenAuth={() => setIsAuthOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      
      <main>
        <Hero onOpenAuth={() => setIsAuthOpen(true)} />

        {/* Dedicated Lumière Luxury Lounge & Auth Portal (Matching your uploaded visual) */}
        <LumiereSection onUserAuth={handleAuthSuccess} />

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

      {/* Floating Popup Modal for 1-Click Access Anywhere */}
      <LumiereAuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleAuthSuccess}
      />
    </div>
  );
}
