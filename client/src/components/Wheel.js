import React from 'react';

const Wheel = ({ onSpin }) => {
  const spinWheel = () => {
    const categories = ["Fundamental Rights", "Directive Principles", "Duties", "Amendments"];
    const selectedCategory = categories[Math.floor(Math.random() * categories.length)];
    onSpin(selectedCategory);
  };

  return (
    <div>
      <button onClick={spinWheel}>Spin the Wheel</button>
    </div>
  );
};

export default Wheel;
