import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader'; // Import the Loader component

function FindSignupData() {
    const [findSignupData, setFindSignupData] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchFindSignupData = async () => {
            try {
                const response = await axios.get('https://kbc-backend-code.onrender.com/Get/signup/All/user');
                setFindSignupData(response.data);
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching findSignupData:', error);
                toast.error('Error fetching findSignupData from Backend');
                setLoading(false); // Set loading to false even if there is an error
            }
        };

        fetchFindSignupData();
    }, []);

    const handleDeleteUser = async (emailId) => {
        try {
            const response = await axios.delete('https://kbc-backend-code.onrender.com/delete/login/user/by/email', {
                data: { id: emailId } // Ensure 'id' matches what backend expects
            });

            // Update state to remove the deleted user
            setFindSignupData(findSignupData.filter(user => user._id !== emailId));
            toast.success('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Error deleting user');
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="container mx-auto p-4">
            <ToastContainer />
            <h1 className="text-3xl font-bold text-center mt-5">All Signup User & Admin Data</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {findSignupData.map((userData) => (
                    <div key={userData._id} className="p-4 border rounded shadow" style={{
                        backgroundImage: "url('https://navbharattimes.indiatimes.com/thumb/69355236/kbc-69355236.jpg?imgsize=428966&width=1200&height=900&resizemode=75')",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}>
                        <h2 className="text-lg font-semibold mb-2 text-white hover:bg-black rounded-e-full">Name : {userData.name}</h2>
                        <div className="flex items-center justify-between">
                            <p className="mt-2 text-white hover:bg-black rounded-e-full"> Email : {userData.email}</p>
                        </div>
                        <div className="max-w-full text-white hover:bg-black rounded-e-full">
                            <div className="flex items-center justify-between">
                                <p className="mt-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
                                    Password: {userData.password}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-white hover:bg-black rounded-e-full">
                            <p className="mt-2"> Mobile Number : {userData.mobile_number}</p>
                        </div>
                        <div className="flex items-center justify-between text-white hover:bg-black rounded-e-full">
                            <p className="mt-2"> Admin Token : {userData.adminToken}</p>
                        </div>
                        <div className="flex items-center justify-between text-white hover:bg-black rounded-e-full">
                            <p className="mt-2"> Role : {userData.role}</p>
                        </div>
                        <div className="flex items-center justify-between text-white hover:bg-black rounded-e-full">
                            <p className="mt-2 text-sm">createdAt : {userData.createdAt}</p>
                            <FaTrash
                                className="ml-4 text-red-500 text-2xl cursor-pointer"
                                onClick={() => handleDeleteUser(userData._id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FindSignupData;
