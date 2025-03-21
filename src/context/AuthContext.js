import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as jwtDecode from "jwt-decode";

// Tạo AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hàm kiểm tra và decode token
  const checkAuthStatus = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");

      if (accessToken) {
        const decodedToken = jwtDecode.jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp && decodedToken.exp < currentTime) {
          await AsyncStorage.removeItem("accessToken");
          setUser(null);
        } else {
          setUser(decodedToken);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Hàm đăng nhập
  const login = async (token) => {
    try {
      setLoading(true);
      await AsyncStorage.setItem("accessToken", token);
      const decodedToken = jwtDecode.jwtDecode(token);
      setUser(decodedToken);
    } catch (error) {
      console.error("Login failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Hàm đăng xuất
  const logout = async () => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem("accessToken");
      setUser(null); // Đặt user về null ngay lập tức
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Effect để kiểm tra khi mount
  useEffect(() => {
    checkAuthStatus();

    const interval = setInterval(() => {
      checkAuthStatus();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Giá trị context
  const value = {
    user,
    loading,
    login,
    logout,
    refreshAuthStatus: () => {
      setLoading(true);
      checkAuthStatus();
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
