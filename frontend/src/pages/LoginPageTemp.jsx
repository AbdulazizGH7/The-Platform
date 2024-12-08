import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../utilities/DataContext';

function LoginPageTemp() {
  
  const [name, setName] = useState('');
  const { loadUserData } = useData();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (name) {
      loadUserData(name);
      navigate('/home'); 
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
