import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const BASE_URL = "https://redesigned-space-potato-qg9pj9g9g45299x5-5000.app.github.dev/"

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
  },
});

// multipart form data api client2
const apiClient2: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
    "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
  },
});

interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export const get = async <T>(url: string, params?: object): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.get(url, { params });
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    handleApiError(error as AxiosError);
    throw error;
  }
};

export const post = async <T>(url: string, data: object): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.post(url, data);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    handleApiError(error as AxiosError);
    throw error;
  }
};

const handleApiError = (error: AxiosError): void => {
  if (error.response) {
    console.error('API Error:', error.response.status, error.response.data);
  } else if (error.request) {
    console.error('No response received:', error.request);
  } else {
    console.error('Error:', error.message);
  }
};

export { apiClient, apiClient2 }; 
