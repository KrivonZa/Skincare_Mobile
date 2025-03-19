import axios from "axios";

const apiFile = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_BASE_URL}/api`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

export default apiFile;
