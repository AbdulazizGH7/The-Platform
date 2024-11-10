import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../utils/UserContext';

function LoginPageTemp() {
  
  const [name, setName] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (name) {
      setUser({ name }); // Save the user name to context
      navigate('/home'); // Redirect to the Home page
    }
  };

  return (
    <div>
      <h1 className="text-gray-100 text-4xl">Login page</h1>
      <input
        placeholder='Enter your name...'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <br />
      <button className='bg-white p-10 mt-3' onClick={handleLogin}>
        Log in
      </button>
    </div>
  );
}

export default LoginPageTemp;
