import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { message } from "antd";
import useUserStore from "@/store/user";

export default class Requests {
  instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);

    this.instance.interceptors.request.use((config) => {
      const token = useUserStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.instance.interceptors.response.use(
      (response) => {
        if (response.data && response.data.code === 200) {
          return response.data.data;
        }
        return response.data;
      },
      (error) => {
        message.error(error.response.data.message);
        return Promise.reject(error);
      }
    );
  }

  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.instance.request(config);
  }

  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config);
  }

  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.post(url, data, config);
  }

  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.put(url, data, config);
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config);
  }

  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.patch(url, data, config);
  }
}
