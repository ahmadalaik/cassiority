// import { useAuthStore } from "@/stores/auth-store";
import { useAuthStore } from "@/stores/use-auth-store";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

const API = axios.create({
  //set default endpoint API
  baseURL: BASE_URL,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  // const token = useAuthStore.getState().accessToken;
  const token = useAuthStore.getState().user.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string | null) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((req) => {
    if (error) req.reject(error);
    else req.resolve(token);
  });
  failedQueue = [];
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((accessToken) => {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return API(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(
          `${BASE_URL}/auth/refresh`,
          { refreshToken: useAuthStore.getState().user.refreshToken },
          { withCredentials: true },
        );

        const newAccessToken = res.data.data.accessToken;

        // useAuthStore.getState().setAccessToken(newAccessToken);
        useAuthStore.setState((prevState) => ({
          user: { ...prevState.user, accessToken: newAccessToken },
        }));

        processQueue(null, newAccessToken);
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default API;
