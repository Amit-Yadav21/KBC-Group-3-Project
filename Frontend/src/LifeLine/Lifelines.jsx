import React, { useState, useEffect } from "react";
import axios from 'axios';

function Lifelines() {
  const handleLifelineClick = (type) => {
    alert(`Lifeline ${type} used!`);
  };

  const [lifelines, setLifelines] = useState([]);
  console.log('Get All Lifelines:- ', lifelines);

  useEffect(() => {
    const fetchLifelines = async () => {
      try {
        const response = await axios.get('https://kbc-backend-code.onrender.com/GetAll/Lifelines');
        setLifelines(response.data.lifelines); // Assuming the data structure is { lifelines: [...] }
      } catch (error) {
        console.error('Failed to fetch lifelines:', error);
      }
    };

    fetchLifelines();
  }, []);

  return (
    <div className="container mx-auto p-3">
      <div className="flex flex-wrap justify-center gap-2">
        {lifelines.map((lifeline) => (
          <button
            key={lifeline.id}
            onClick={() => handleLifelineClick(lifeline.type)}
            className="w-full sm:w-auto px-4 py-2 text-lg sm:text-xl lg:text-2xl font-bold text-white bg-pink-400 rounded cursor-pointer hover:bg-pink-500 transition-colors"
          >
            {lifeline.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Lifelines;
