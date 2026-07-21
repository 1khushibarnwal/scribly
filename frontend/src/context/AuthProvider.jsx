import { useEffect, useRef, useState } from "react";
import axiosInstance, { setupInterceptor } from "../lib/axios";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const tokenRef = useRef(null);
  tokenRef.current = accessToken;

  useEffect(() => {
    setupInterceptor(() => tokenRef.current);
  }, []);

  const signup = async ({ name, email, password }) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/signup", {
        name,
        email,
        password,
      });
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Signup failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (err) {
      console.error("Logout request failed:", err.message);
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, loading, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
