import { createContext, useState, useContext, useEffect } from 'react';  

const UserContext = createContext({  
  user: null,  
  login: () => {},  
  logout: () => {}  
});  

export const UserProvider = ({ children }) => {  
  const [user, setUser] = useState(null);  
  const [loading, setLoading] = useState(true);  

  useEffect(() => {  
    // Check localStorage on initial load  
    const storedUser = localStorage.getItem('user');  
    if (storedUser) {  
      setUser(JSON.parse(storedUser));  
    }  
    setLoading(false);  
  }, []);  

  const login = (userData) => {  
    setUser(userData);  
    localStorage.setItem('user', JSON.stringify(userData));  
  };  

  const logout = () => {  
    setTimeout(() => {
      setUser(null);  
      localStorage.removeItem('user');  
    }, 100);
  };  

  if (loading) {  
    return <div className="flex justify-center items-center min-h-screen">
    <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
  </div>; // Or any loading component  
  }  

  return (  
    <UserContext.Provider value={{ user, login, logout, setUser }}>  
      {children}  
    </UserContext.Provider>  
  );  
};  

export const useUser = () => useContext(UserContext);  