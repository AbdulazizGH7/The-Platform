import React, { useState } from 'react';
import Computer from "../assets/Images/Computer.svg";
import { useNavigate } from 'react-router-dom';
import { useData } from '../utilities/DataContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const { loadUserData } = useData();
  const navigate = useNavigate();

  const validateEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = () => {
    setEmailError(false);
    setPasswordError(false);
    setErrorMessage('');

    if (!email || !password) {
      setEmailError(!email);
      setPasswordError(!password);
      setErrorMessage('Email and Password cannot be empty');
      return;
    }

    if (!validateEmailFormat(email)) {
      setEmailError(true);
      setErrorMessage('Invalid email format');
      return;
    }
    
    if (email === 'test@example.com' && password === 'password') {
      loadUserData(name);
      navigate('/home');
    } else {
      setErrorMessage('Either Email or Password is wrong');
    }
  };

  const goToSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="flex items-center justify-center min-h-screen m-10">
      <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 mx-auto gap-20">
        {/* Login Form Container */}
        <div
          className="flex flex-col items-center justify-between p-8 w-[90%] max-w-md h-[85vh] max-h-[65vh] mx-auto rounded-lg md:max-h-[50vh] lg:max-h-[45vh]"
          style={{
            background: 'linear-gradient(152deg, #29124C 28.83%, #252772 100.54%)',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          }}
        >
          {/* Top section with greeting text */}
          <div className="border-b-2 border-white">
            <h2 className="text-white text-3xl font-bold w-full text-center md:text-5xl w-[30%]">Hello, Welcome!</h2>
            <hr className="w-full border-gray-300 mt-2" />
          </div>

          {/* Input fields with padding between */}
          <div className="flex flex-col items-center w-full space-y-8 mt-8">
            <input
              type="email"
              placeholder="Enter your Email"
              className={`w-full p-2 rounded-md text-gray-700 text-sm ${emailError ? 'border-2 border-red-500' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your Password"
              className={`w-full p-2 rounded-md text-gray-700 text-sm ${passwordError ? 'border-2 border-red-500' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error message display container with fixed height */}
          <div className="h-6 mt-4">
            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}
          </div>

          {/* Button container at the bottom */}
          <div className="w-full flex flex-col items-center space-y-4 mt-8">
            <button
              className="flex justify-center items-center text-gray-100 rounded-3xl font-bold bg-[#8D8DDA] hover:bg-[#7D7DC5] text-md px-16 py-3 w-[100%] md:w-[60%] lg:w-[50%] lg:py-4"
              onClick={handleLogin}
            >
              <div className="whitespace-nowrap">Login</div>
            </button>
            <button
              className="flex justify-center items-center text-gray-100 rounded-3xl font-bold bg-[#8D8DDA] hover:bg-[#7D7DC5] text-md px-16 py-3 w-[100%] md:w-[60%] lg:w-[50%] lg:py-4"
              onClick={goToSignUp}
            >
              <div className="whitespace-nowrap">New User?</div>
            </button>
          </div>
        </div>

        {/* Vertical line (border) between components, hidden on small screens */}
        <div className="hidden lg:block border-l-2 border-white h-[70vh]"></div>

        {/* Image Section */}
        <div className="hidden lg:block">
          <img
            src={Computer}
            alt="Computer illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;