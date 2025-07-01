import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class Requests {
  private instance: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.data && response.data.code === 200) {
          return response.data.data;
        }
        return response.data;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  public get<T>(url: string, params: any) {
    return this.instance.get<T>(url, { params });
  }

  public post<T>(url: string, data: any) {
    return this.instance.post<T>(url, data);
  }

  public put<T>(url: string, data: any) {
    return this.instance.put<T>(url, data);
  }

  public delete<T>(url: string, params: any) {
    return this.instance.delete<T>(url, { params });
  }
}

export default Requests;
