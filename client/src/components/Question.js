import React, { useState } from 'react';

const Question = ({ questionData, onSubmit }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleSubmit = () => {
    if (selectedAnswer) {
      onSubmit(selectedAnswer);
    }
  };

  return (
    <div>
      <h3>{questionData.question}</h3>
      <div>
        {questionData.options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              name="answer"
              value={option}
              onChange={() => setSelectedAnswer(option)}
            />
            {option}
          </label>
        ))}
      </div>
      <button onClick={handleSubmit}>Submit Answer</button>
    </div>
  );
};

export default Question;
