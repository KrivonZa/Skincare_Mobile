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
        // Decode token
        const decodedToken = jwtDecode.jwtDecode(accessToken);

        // Kiểm tra token có hợp lệ không (thời gian hết hạn)
        const currentTime = Date.now() / 1000; // Chuyển sang giây
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          // Token hết hạn
          await AsyncStorage.removeItem("accessToken");
          setUser(null);
        } else {
          // Token còn hạn
          setUser(decodedToken);
        }
      } else {
        // Không có token
        setUser(null); // Đảm bảo user là null khi không có token
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setUser(null); // Xử lý lỗi bằng cách đặt user về null
    } finally {
      setLoading(false);
    }
  };

  // Effect để chạy khi component mount
  useEffect(() => {
    checkAuthStatus();

    // Tự động kiểm tra định kỳ (mỗi 5 phút)
    const interval = setInterval(() => {
      checkAuthStatus();
    }, 5 * 60 * 1000); // 5 phút

    // Cleanup interval khi component unmount
    return () => clearInterval(interval);
  }, []);

  // Thêm hàm thủ công để kiểm tra lại khi cần
  const refreshAuthStatus = () => {
    setLoading(true);
    checkAuthStatus();
  };

  // Giá trị context cung cấp cho các component con
  const value = {
    user,
    loading,
    refreshAuthStatus, // Thêm hàm này để component con có thể gọi khi cần
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook để sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
