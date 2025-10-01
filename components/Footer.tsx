import React, { useRef, useEffect } from 'react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const clickCount = useRef(0);
  const clickTimer = useRef<number | null>(null);

  // Clear timer on component unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
      }
    };
  }, []);

  const handleHeartClick = () => {
    // Always clear the previous timer on each click to reset the 2-second window
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
    }

    clickCount.current += 1;

    if (clickCount.current >= 5) {
      clickCount.current = 0; // Reset count for the next time
      onNavigate('admin');
    } else {
      // Set a new timer to reset the count if the user stops clicking
      clickTimer.current = window.setTimeout(() => {
        clickCount.current = 0;
      }, 2000); // 2-second window to complete the 5 clicks
    }
  };

  return (
    <footer className="bg-brand-fuchsia text-white text-center py-6">
      <div className="container mx-auto px-4">
        <p className="font-semibold">
          &copy; {new Date().getFullYear()} Bianca's Waffle. Todos los derechos reservados.
        </p>
        <p className="text-sm mt-2 opacity-75">
          Diseñado con <span onClick={handleHeartClick} className="cursor-pointer select-none" title="Admin Access">❤️</span> para los amantes de los waffles.
        </p>
      </div>
    </footer>
  );
};

export default Footer;