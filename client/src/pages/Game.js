import React, { useState, useEffect } from 'react';
import Wheel from '../components/Wheel';
import Question from '../components/Question';
import { fetchQuestions, submitAnswer } from '../services/api';

const Game = () => {
  const [category, setCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (category) {
      fetchQuestions().then((data) => setQuestions(data));
    }
  }, [category]);

  const handleSpin = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleAnswerSubmit = (selectedAnswer) => {
    const questionData = questions[currentQuestionIndex];
    submitAnswer({
      username: 'ekansh', // Replace with dynamic user
      question: questionData.question,
      selectedAnswer: selectedAnswer,
      correctAnswer: questionData.correctAnswer,
    }).then((response) => {
      setScore(response.score);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        alert('Game over! Your score is: ' + score);
      }
    });
  };

  return (
    <div>
      <Wheel onSpin={handleSpin} />
      {questions.length > 0 && (
        <Question
          questionData={questions[currentQuestionIndex]}
          onSubmit={handleAnswerSubmit}
        />
      )}
      <div>Score: {score}</div>
    </div>
  );
};

export default Game;
