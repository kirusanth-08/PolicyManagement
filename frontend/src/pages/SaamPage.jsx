import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SaamPage = () => {
  const [saamModules, setSaamModules] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizResults, setQuizResults] = useState({});

  useEffect(() => {
    // Fetch SAAM data from backend
    const fetchSaamData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/saam');
        setSaamModules(response.data);
      } catch (error) {
        console.error('Failed to load SAAM modules');
        console.log(error);
      }
    };
    fetchSaamData();
  }, []);

  // Handle when a user selects an answer for a quiz
  const handleAnswerSelection = (moduleIndex, quizIndex, selectedOption) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [`${moduleIndex}-${quizIndex}`]: selectedOption
    });
  };

  // Handle when user submits a quiz
  const handleSubmitQuiz = (moduleIndex, quizIndex, correctAnswer) => {
    const userAnswer = selectedAnswers[`${moduleIndex}-${quizIndex}`];
    if (userAnswer === correctAnswer) {
      setQuizResults({
        ...quizResults,
        [`${moduleIndex}-${quizIndex}`]: 'Correct answer!'
      });
    } else {
      setQuizResults({
        ...quizResults,
        [`${moduleIndex}-${quizIndex}`]: 'Incorrect answer. Try again.'
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      {saamModules.map((module, moduleIndex) => (
        <div key={moduleIndex} className="module mb-8 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4">{module.title}</h2>
          <p className="mb-4">{module.description}</p>

          <h3 className="text-xl font-semibold mb-2">Videos</h3>
          {module.videoLinks.map((video, idx) => (
            <div key={idx} className="mb-4">
              <p className="font-medium">{video.description}</p>
              <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Watch Video</a>
            </div>
          ))}

          <h3 className="text-xl font-semibold mb-2">Documents</h3>
          {module.documents.map((doc, idx) => (
            <div key={idx} className="mb-4">
              <p className="font-medium">{doc.fileName}</p>
              <a href={doc.downloadLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Download</a>
            </div>
          ))}

          {module.quizzes.map((quiz, quizIndex) => (
            <div key={quizIndex} className="quiz mb-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">{quiz.question}</h3>
              <div className="radio-group mb-4">
                {quiz.options.map((option, optionIndex) => (
                  <label key={optionIndex} className="block mb-2">
                    <input
                      type="radio"
                      name={`quiz-${moduleIndex}-${quizIndex}`}
                      value={option}
                      onChange={() => handleAnswerSelection(moduleIndex, quizIndex, option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
              <button
                className="submit-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                onClick={() => handleSubmitQuiz(moduleIndex, quizIndex, quiz.correctAnswer)}
              >
                Submit Answer
              </button>
              {quizResults[`${moduleIndex}-${quizIndex}`] && (
                <p className="mt-2">{quizResults[`${moduleIndex}-${quizIndex}`]}</p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SaamPage;