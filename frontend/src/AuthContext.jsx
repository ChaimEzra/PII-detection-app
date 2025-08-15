// import { createContext, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   const login = () => {
//     setIsAuthenticated(true);
//     navigate("/"); // נווט לדף הבית אחרי התחברות
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     navigate("/login-page"); // נווט לדף ההתחברות אחרי התנתקות
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // טוענים את המצב ההתחלתי מה-localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const navigate = useNavigate();

  useEffect(() => {
    // כל פעם שהמצב משתנה, נשמור אותו ב-localStorage
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  const login = () => {
    setIsAuthenticated(true);
    navigate("/"); // מעבר לדף הבית
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate("/login-page"); // מעבר לדף ההתחברות
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
