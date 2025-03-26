import React from 'react';
import './HeroSection.css';

interface HeroSectionProps {
    imageUrl: string;
    title: string;
    subtitle: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ imageUrl, title, subtitle }) => {
    return (
        <div className="hero-container">
            <img src={imageUrl} alt="3D Model" className="hero-image" />
            <div className="hero-overlay">
                <h1 className="hero-title">{title}</h1>
                <p className="hero-subtitle">{subtitle}</p>
            </div>
        </div>
    );
};

export default HeroSection;
