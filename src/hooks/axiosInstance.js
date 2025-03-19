import axios from "axios";

let authContext = null;

export const setAuthContext = (context) => {
  authContext = context;
};

const api = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 🛠️ Add a response interceptor (Auto logout on 401)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("[Auth Debug] Token expired, logging out...");

      if (authContext) {
        authContext.setUser(null);
        authContext.router.push("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
