import { createContext, useContext, useState, useEffect, use } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    console.log("Login state changed:", loggedIn);
    console.log("User data:", user);
  }, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp > currentTime) {
          setUser({
            id: decoded.id,
            name: decoded.name,
            studentId: decoded.studentId,
          });
          setLoggedIn(true);
        } else {
          // Token expired
          console.warn("Token expired");
          logout();
        }
      } catch (err) {
        console.error("Invalid token:", err);
        logout();
      }
    }
    setAuthLoading(false);
  }, []);

  const login = (userData) => {
    setLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, login, logout, user, authLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
