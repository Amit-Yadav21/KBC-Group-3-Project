import React, { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const AddQuestionForm = () => {
  const [formData, setFormData] = useState({
    question: "",
    options: ["", "", "", ""],
    correct: 0,
    category: "",
  });

  const navigate = useNavigate();  // Initialize useNavigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    setFormData({ ...formData, options: updatedOptions });
  };

  const handleCorrectOptionChange = (index) => {
    setFormData({ ...formData, correct: index });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://kbc-backend-code.onrender.com/Create/Questions", {
        question: formData.question,
        options: formData.options,
        correct: formData.correct,
        category: formData.category,
      });

      console.log("Question added successfully:", response.data);
      toast.success("Question added successfully!");

      // Clear the form fields after submission
      setFormData({
        question: "",
        options: ["", "", "", ""],
        correct: 0,
        category: "",
      });

      // Redirect to the all questions page after 3 seconds
      setTimeout(() => {
        navigate('/FetchAllQuestions');  // Replace with your route
      }, 3000);  // 3000 milliseconds = 3 seconds

    } catch (error) {
      console.error("Question Error:", error);
      toast.error("Failed to add question. Please try again.");
    }
  };

  return (
    <div className="bg-slate-300 p-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
          <FaQuestionCircle className="mr-2 text-blue-500" />
          Add Question
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="question"
              className="block text-sm font-medium text-gray-700"
            >
              Question
            </label>
            <textarea
              id="question"
              name="question"
              value={formData.question}
              onChange={handleInputChange}
              placeholder="Enter the question"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Options
            </label>
            {formData.options.map((option, index) => (
              <div key={index} className="flex items-center mt-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                  required
                />
                <input
                  type="radio"
                  name="correct"
                  value={index}
                  checked={formData.correct === index}
                  onChange={() => handleCorrectOptionChange(index)}
                  className="ml-4"
                />
                <span className="ml-2 text-sm text-gray-700">Correct</span>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Question Category Name
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Enter the category"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg cursor-pointer hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-400 transition duration-300"
          >
            Submit
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddQuestionForm;
