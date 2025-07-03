import React, { useState } from 'react';
import './Connect.css';
import mac from '../../assets/mac.JPG'
import macset from '../../assets/macset.JPG'
import monitor from '../../assets/monitor.JPG'
import car from '../../assets/car.jpg'

const Connect: React.FC = () => {
  const [hasBeenHovered, setHasBeenHovered] = useState<boolean>(false);

  const handleFirstHover = (): void => {
    if (!hasBeenHovered) {
      setHasBeenHovered(true);
    }
  };

  return (
    <div className="connect">
      <div className={`connect-images ${hasBeenHovered ? 'hovered' : ''}`}>
        <img src={mac} alt="Mac" onMouseEnter={handleFirstHover} />
        <img src={macset} alt="Mac Setup" onMouseEnter={handleFirstHover} />
        <img src={monitor} alt="Monitor" onMouseEnter={handleFirstHover} />
        <img src={car} alt="Car" onMouseEnter={handleFirstHover} />
      </div>
    </div>
  );
};

export default Connect;