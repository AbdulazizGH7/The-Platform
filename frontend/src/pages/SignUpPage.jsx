import React, { useState } from 'react';
import Computer from "../assets/Images/Computer.svg";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext'
import axios from 'axios'
function SignUpPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);

  // Error states and messages
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [termsError, setTermsError] = useState(false);
  const [termsErrorMessage, setTermsErrorMessage] = useState('');

  const {login} = useUser()
  const navigate = useNavigate();

  const validateEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handleSignUp = async () => {
    // Reset error states and messages
    setUsernameError(false);
    setUsernameErrorMessage('');
    setEmailError(false);
    setEmailErrorMessage('');
    setPasswordError(false);
    setPasswordErrorMessage('');
    setTermsError(false);
    setTermsErrorMessage('');

    let hasError = false;

    // Client-side validation
    if (!username) {
      setUsernameError(true);
      setUsernameErrorMessage('Username cannot be empty');
      hasError = true;
    }
  
    if (!email) {
      setEmailError(true);
      setEmailErrorMessage('Email cannot be empty');
      hasError = true;
    } else if (!validateEmailFormat(email)) {
      setEmailError(true);
      setEmailErrorMessage('Invalid email format');
      hasError = true;
    }
  
    if (!password) {
      setPasswordError(true);
      setPasswordErrorMessage('Password cannot be empty');
      hasError = true;
    }
  
    if (!termsAgreed) {
      setTermsError(true);
      setTermsErrorMessage('You must agree on the Terms of Service');
      hasError = true;
    }
  
    if (hasError) {
      return;
    }

    // Handle server-side validation errors if no errors have been found
    try {
      const response = await axios.post('http://localhost:8080/auth/signup/', {
        username,
        email,
        password,
      });
    
      if (response.status === 201) {
        login(response.data.user)
        navigate('/home');
      }
    } catch (error) {
      console.error('Error object:', error);
    
      // Fallback in case `error.response` is undefined
      if (error.response) {
        const { usernameTaken, emailTaken } = error.response.data;
    
        if (usernameTaken) {
          setUsernameError(true);
          setUsernameErrorMessage('Username is already taken');
        }
        if (emailTaken) {
          setEmailError(true);
          setEmailErrorMessage('Email is already used');
        }
      } else {
        setUsernameError(true);
        setUsernameErrorMessage('Something went wrong. Please try again later.');
      }
    }
    
  
    // Server-side validation

    if (isUsernameTaken(username)) {
      setUsernameError(true);
      setUsernameErrorMessage('Username is already taken');
      hasError = true;
    }

    // Email validation
    if (isEmailTaken(email)) {
      setEmailError(true);
      setEmailErrorMessage('Email is already used');
      hasError = true;
    }

    // If any errors, do not proceed
    if (hasError) {
      return;
    }

    // Proceed to add user and navigate to home
    login(response.data.user)
    navigate('/home');
  };

  return (
    <div className="flex items-center justify-center min-h-screen mx-8">
      <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 mx-auto gap-20">
        <div
          className="flex flex-col items-center justify-between p-8 w-[90%] max-w-md h-auto mx-auto rounded-lg w-[300px] max-w-md h-[85vh] max-h-[600px] mx-auto rounded-lg md:max-h-[650px] md:w-[800px] lg:max-h-[800px]"
          style={{
            background: 'linear-gradient(152deg, #29124C 28.83%, #252772 100.54%)',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div className="border-b-2 border-white w-full">
            <h2 className="text-white text-3xl font-bold w-full md:text-5xl">Sign Up</h2>
            <hr className="w-full border-gray-300 mt-2" />
          </div>

          <div className="flex flex-col items-center w-full space-y-5 mt-8">
            {/* Username Field */}
            <div className="w-full">
              <input
                type="text"
                placeholder="Enter your Username"
                className={`w-full p-2 rounded-md text-gray-700 text-sm ${
                  usernameError ? 'border-2 border-red-500' : ''
                }`}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (usernameError) {
                    setUsernameError(false);
                    setUsernameErrorMessage('');
                  }
                }}
              />
              <div className="h-5">
                {usernameError && (
                  <p className="text-red-500 text-sm mt-1 text-center">
                    {usernameErrorMessage}
                  </p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="w-full">
              <input
                type="email"
                placeholder="Enter your KFUPM Email"
                className={`w-full p-2 rounded-md text-gray-700 text-sm ${
                  emailError ? 'border-2 border-red-500' : ''
                }`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) {
                    setEmailError(false);
                    setEmailErrorMessage('');
                  }
                }}
              />
              <div className="h-5">
                {emailError && (
                  <p className="text-red-500 text-sm mt-1 text-center">
                    {emailErrorMessage}
                  </p>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="w-full">
              <input
                type="password"
                placeholder="Enter your Password"
                className={`w-full p-2 rounded-md text-gray-700 text-sm ${
                  passwordError ? 'border-2 border-red-500' : ''
                }`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) {
                    setPasswordError(false);
                    setPasswordErrorMessage('');
                  }
                }}
              />
              <div className="h-5">
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1 text-center">
                    {passwordErrorMessage}
                  </p>
                )}
              </div>
            </div>

            {/* Terms of Service Checkbox */}
            <div className="w-full flex items-center mt-4">
              <input
                type="checkbox"
                id="terms"
                checked={termsAgreed}
                onChange={(e) => {
                  setTermsAgreed(e.target.checked);
                  if (termsError) {
                    setTermsError(false);
                    setTermsErrorMessage('');
                  }
                }}
                className={`mr-2 ${termsError ? 'border-2 border-red-500' : ''}`}
              />
              <label htmlFor="terms" className="text-white text-sm">
                I agree on the Terms of Service.
              </label>
            </div>
            <div className="h-5 w-full">
              {termsError && (
                <p className="text-red-500 text-sm mt-1 text-center">
                  {termsErrorMessage}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full flex flex-col items-center space-y-4 mt-10">
            <button
              className="flex justify-center items-center text-gray-100 rounded-3xl font-bold bg-[#8D8DDA] hover:bg-[#7D7DC5] text-md px-16 py-3 w-full md:w-[60%] lg:w-[60%] lg:text-2xl"
              onClick={handleSignUp}
            >
              <div className="whitespace-nowrap">Sign Up</div>
            </button>
          </div>
          {/* Already Signed Button */}
          <div className="w-full flex flex-col items-center space-y-4 mt-4">
            <button
              className="flex justify-center items-center text-gray-100 rounded-3xl font-bold bg-[#8D8DDA] hover:bg-[#7D7DC5] text-md px-16 py-3 w-full md:w-[60%] lg:w-[60%] lg:text-2xl"
              onClick={() => navigate('/login')}
            >
              <div className="whitespace-nowrap">Already Signed?</div>
            </button>
          </div>
        </div>

        {/* Optional Side Image */}
        <div className="hidden lg:block border-l-2 border-white h-[70vh]"></div>
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

export default SignUpPage;