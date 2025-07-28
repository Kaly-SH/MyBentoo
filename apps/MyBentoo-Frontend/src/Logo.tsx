import React from 'react';
import './Logo.css';
import DarumaSvg from './assets/daruma.svg';
import LogoText from './assets/mybentoo-logo-text.png';

const Logo: React.FC = () => {
  return (
    <div className="logo-container">
      <div className="logo-text-container">
        <img src={LogoText} alt="MyBentoo Logo Text" className="logo-text" />
      </div>
      <img src={DarumaSvg} alt="Daruma" className="logo-daruma" />
    </div>
  );
};

export default Logo;