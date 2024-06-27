import React from "react";
import { Link } from "react-router-dom";
import { FaUserAlt, FaQuestionCircle, FaBell, FaSignOutAlt, FaHome } from "react-icons/fa";
import { GiSoundOn } from "react-icons/gi";
import { BsRouterFill } from "react-icons/bs";

const UserDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-5">
      <div className="max-w-8xl bg-white shadow rounded-lg p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-800 mb-1">
            User Dashboard
          </h1>
          <FaBell className="text-7xl text-blue-500" />
        </div>
        <p className="text-lg text-gray-600 mb-4">
          Welcome to the KBC Game! Test your knowledge with 20 random questions presented to you one by one.
          For every correct question, you win ₹1000. If you choose the correct option, it will turn green.
          If you choose the wrong answer, the option background will turn red. After choosing a wrong answer, the correct answer will be shown.
          If you select a wrong answer, it will turn red, the accumulated amount will be shown, and the game will stop with that amount.
        </p>
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="md:w-1/2 p-1">
            <h2 className="text-3xl font-semibold text-gray-800 mb-2 flex items-center">
              <FaUserAlt className="mr-2 text-blue-500" /> User Features
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Register an account and play</li>
              <li>If user not create register acoount . User can not play KBC game .</li>
              <li>Play with login</li>
              <li>User can access all lifelines</li>
              <li>Lifeline is not working right now. Because Lifeline is a work in progress.</li>
            </ul>
          </div>
          <div className="md:w-1/2 p-1">
            <h2 className="text-3xl font-semibold text-gray-800 mb-2 flex items-center">
              <FaQuestionCircle className="mr-2 text-blue-500" /> Lifelines
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>50-50: Two incorrect options will be disabled</li>
              <li>Ask The Audience</li>
              <li>Switch a Question: Skip the current question</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="md:w-1/2 p-1">
            <h2 className="text-3xl font-semibold text-gray-800 mb-2 flex items-center">
              <BsRouterFill className="mr-2 text-blue-500" /> User Routes Access
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>User Dashboard Route</li>
              <li>GameStart Route: Users can go to the GameStart route to play the KBC game.</li>
            </ul>
          </div>
          <div className="md:w-1/2 p-1">
            <h2 className="text-3xl font-semibold text-gray-800 mb-2 flex items-center">
              <FaSignOutAlt className="mr-2 text-blue-500" /> Logout Features
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>If the user wants to log out of their account, they must first go to the <b><i>UserDashboard</i></b> route. Only then will they be able to log out, as the logout button is displayed on the <b><i>UserDashboard</i></b> route.</li>
              <li>After logging out, the user can move to the signup page. If the user wants to play again, they must log in first before playing the game.</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="md:w-1/2 p-1">
            <h2 className="text-3xl font-semibold text-gray-800 mb-2 flex items-center">
              <GiSoundOn className="mr-2 text-blue-500" /> Sounds
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              <li><b>Start KBC Game button : </b>If you click the <b>Start KBC Game</b> button, it will play a sound.</li>
              <li><b>Correct opation : </b>If you click the <b>Correct</b> option, it will play a sound.</li>
              <li><b>InCorrect opation : </b>If you click the <b>InCorrect</b> option, it will play a sound.</li>
            </ul>
          </div>
          <div className="md:w-1/2 p-3">
            <div className="flex justify-center">
              <div className=" flex justify-center items-center sm:w-full lg:w-8/12">
                <img
                  src="https://lh3.googleusercontent.com/couUyzjpRp-J5YOaSV31i4OfktSulw5HRP5rwfnZdCsiEbrKudPFXhqcUumOBxh-3w"
                  alt="KBC Game"
                  className="w-[50%] rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;