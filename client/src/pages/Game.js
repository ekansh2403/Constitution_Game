import React, { useState } from 'react';
import Wheel from '../components/Wheel';
import Question from '../components/Question'; // Ensure Question component is adapted to handle multiple-choice questions
import { themes } from '../data/questions'; // Import the themes

const Game = () => {
  const [theme, setTheme] = useState('');
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);

  const handleSpin = (selectedTheme, selectedQuestion) => {
    setTheme(selectedTheme);
    setQuestion(selectedQuestion);
  };

  const handleAnswerSubmit = (selectedAnswer) => {
    if (question) {
      const isCorrect = selectedAnswer === question.answer;
      setScore((prevScore) => prevScore + (isCorrect ? 1 : 0));
      
      // Optionally reset the question
      setQuestion(null);
    }
  };

  return (
    <div>
      <Wheel onSpin={handleSpin} />
      {question && (
        <Question
          questionData={question}
          onSubmit={handleAnswerSubmit}
        />
      )}
      <div>Theme: {theme}</div>
      <div>Score: {score}</div>
    </div>
  );
};

export default Game;
