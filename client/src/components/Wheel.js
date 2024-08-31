import React, { useState, useEffect } from 'react';
import { themes } from '../data/questions';
import './Wheel.css'; // Import the CSS file for styles

const Wheel = ({ onSpin }) => {
  const [spinning, setSpinning] = useState(false);
  const themeNames = Object.keys(themes);

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);

    const selectedTheme = themeNames[Math.floor(Math.random() * themeNames.length)];
    const questions = themes[selectedTheme];
    const selectedQuestion = questions[Math.floor(Math.random() * questions.length)];

    setTimeout(() => {
      onSpin(selectedTheme, selectedQuestion);
      setSpinning(false);
    }, 3000); // Duration of the spin animation
  };

  return (
    <div className="wheel-container">
      <div className={`wheel ${spinning ? 'spin' : ''}`}>
        {themeNames.map((theme, index) => (
          <div key={index} className="wheel-segment">
            <span>{theme}</span>
          </div>
        ))}
      </div>
      <button onClick={spinWheel} disabled={spinning}>Spin the Wheel</button>
    </div>
  );
};

export default Wheel;
