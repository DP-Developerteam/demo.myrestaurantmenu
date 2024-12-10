// src/components/Common.jsx
//Import styles and libraries
import './__components.scss';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
//Import images
import ArrowUp from '../assets/img/arrow-up-button.svg';

// ***************
// BackTopButton Component
// Displays a button to scroll back to the top when the user scrolls down the page
// ***************
export const BackTopButton = () => {
    // State to toggle button visibility
    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        // Function to toggle visibility based on scroll position
        const handleScroll = () => {
            // Shows button when scrolled down more than 500px
            setShowScrollButton(window.scrollY > 500);
        };

        // Attach the scroll event listener when component mounts
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth scroll back to top when button is clicked
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {showScrollButton && (
                // Conditional rendering: only show button when showScrollButton is true
                <button onClick={scrollToTop} className="scrollTop">
                    <img className="icon" src={ArrowUp} alt="button arrow back to top" />
                </button>
            )}
        </>
    );
};

// ***************
// ScrollToTop Component
// Automatically scrolls to the top of the page when the route changes
// ***************
export const ScrollToTop = () => {
    // Get the current route pathname
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to the top of the page whenever the pathname changes
        window.scrollTo(0, 0);
    }, [pathname]); // Dependency array: runs this effect when pathname changes
    // This component does not render anything visually
    return null;
};
