import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [email, setEmail] = useState(Cookies.get("email") || null);

  const login = (token, email) => {
    setToken(token);
    setEmail(email);
    Cookies.set("token", token, { expires: 1 });
    Cookies.set("email", email, { expires: 1 });
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    Cookies.remove("token");
    Cookies.remove("email");
  };

  return (
    <AuthContext.Provider value={{ token, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
