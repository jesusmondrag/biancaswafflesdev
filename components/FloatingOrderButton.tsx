import React from 'react';

interface FloatingOrderButtonProps {
    orderCount: number;
    onClick: () => void;
}

const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);


const FloatingOrderButton: React.FC<FloatingOrderButtonProps> = ({ orderCount, onClick }) => {
    if (orderCount === 0) {
        return null;
    }

    return (
        <button
            onClick={onClick}
            className="lg:hidden fixed bottom-6 right-6 bg-brand-fuchsia text-white rounded-full h-16 w-16 flex items-center justify-center shadow-2xl z-30 transform transition-transform hover:scale-110"
            aria-label={`Ver pedido con ${orderCount} artículos`}
        >
            <CartIcon />
            <span className="absolute -top-1 -right-1 bg-brand-pink text-brand-fuchsia font-bold text-xs rounded-full h-6 w-6 flex items-center justify-center border-2 border-white">
                {orderCount}
            </span>
        </button>
    );
};

export default FloatingOrderButton;
