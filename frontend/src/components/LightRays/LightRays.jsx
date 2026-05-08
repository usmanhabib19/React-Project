import React from 'react';
import './LightRays.css';

const LightRays = () => {
  return (
    <div className="light-rays-container">
      <div className="ray ray-1"></div>
      <div className="ray ray-2"></div>
      <div className="ray ray-3"></div>
      <div className="ray ray-4"></div>
      <div className="ray ray-5"></div>
      <div className="ray ray-6"></div>
      <div className="ray ray-7"></div>
      <div className="ray ray-8"></div>
      <div className="light-source"></div>
      <div className="dust-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>
    </div>
  );
};

export default LightRays;
