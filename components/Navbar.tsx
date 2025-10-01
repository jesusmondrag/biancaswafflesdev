
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);
  
  const linkBaseClasses = "text-gray-600 hover:text-brand-fuchsia px-3 py-2 rounded-md text-lg font-bold transition-colors";
  const activeLinkClasses = "text-brand-fuchsia font-extrabold";
  
  const mobileLinkClasses = "text-3xl font-extrabold text-white hover:text-brand-pink transition-colors"
  const activeMobileLinkClasses = "text-brand-pink";


  const getLinkClass = (view: string) => {
    return `${linkBaseClasses} ${currentView === view ? activeLinkClasses : ''}`;
  };

  const getMobileLinkClass = (view: string) => {
    return `${mobileLinkClasses} ${currentView === view ? activeMobileLinkClasses : ''}`;
  }

  const handleMobileNav = (view: string) => {
    onNavigate(view);
    setIsMenuOpen(false);
  };
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#menu" onClick={(e) => { e.preventDefault(); onNavigate('menu'); }}>
              <img className="h-16 md:h-20 w-auto" src="/images/logo.png" alt="Bianca's Waffle Logo" />
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a 
                href="#quienes-somos" 
                onClick={(e) => { e.preventDefault(); onNavigate('quienes-somos'); }}
                className={getLinkClass('quienes-somos')}>
                Quiénes Somos
              </a>
              <a 
                href="#menu" 
                onClick={(e) => { e.preventDefault(); onNavigate('menu'); }}
                className={getLinkClass('menu')}>
                Menú
              </a>
              <a 
                href="#contacto" 
                onClick={(e) => { e.preventDefault(); onNavigate('contacto'); }}
                className={getLinkClass('contacto')}>
                Contacto
              </a>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button 
              type="button" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-fuchsia hover:bg-fuchsia-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-fuchsia"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="block h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}
        id="mobile-menu"
      >
        <div className="absolute inset-0 bg-brand-fuchsia bg-opacity-95 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
        <div className="relative h-full flex flex-col items-center justify-center space-y-8">
             <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-8 right-6 text-white p-2"
                aria-label="Close menu"
            >
                <svg className="h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
           <a 
              href="#quienes-somos" 
              onClick={(e) => { e.preventDefault(); handleMobileNav('quienes-somos'); }}
              className={getMobileLinkClass('quienes-somos')}>
              Quiénes Somos
            </a>
            <a 
              href="#menu" 
              onClick={(e) => { e.preventDefault(); handleMobileNav('menu'); }}
              className={getMobileLinkClass('menu')}>
              Menú
            </a>
            <a 
              href="#contacto" 
              onClick={(e) => { e.preventDefault(); handleMobileNav('contacto'); }}
              className={getMobileLinkClass('contacto')}>
              Contacto
            </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;