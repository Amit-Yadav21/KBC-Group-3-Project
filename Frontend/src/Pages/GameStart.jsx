import React, { useState } from "react";
import Quiz from "../Quiz/Quiz";
import useSound from 'use-sound';
import axios from 'axios'; // Import Axios for API requests
import buttonClickSound from "../Sounds/play.mp3";
import bgImage from "../assets/bg.jpg";

const GameStart = () => {
  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState([]);
  console.log('Fetch data from database :- ', questions);
  const [play] = useSound(buttonClickSound);

  const fetchQuestionsFromDB = async () => {
    try {
      const response = await axios.get('https://kbc-backend-code.onrender.com/Get/Random/Questions');
      setQuestions(response.data.selectedQuestions);
      setStart(true); // Once questions are fetched, set start to true to render Quiz component
    } catch (error) {
      console.error('Error fetching questions:', error);
      // Handle error as needed
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {!start ? (
          <button
            onClick={() => {
              play();
              fetchQuestionsFromDB(); // Call function to fetch questions
            }}
            className="px-6 py-3 text-lg font-bold text-white bg-pink-500 rounded cursor-pointer"
          >
            Start KBC Game
          </button>
        ) : (
          <div className="w-full max-w-screen-lg mx-auto">
            <Quiz questions={questions} /> {/* Pass fetched questions to Quiz component */}
          </div>
        )}
      </div>
    </>
  );
};

export default GameStart;
