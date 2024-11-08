import { apiClient, apiClient2 } from "@/services/apiClient";
import { Prompt } from "@/types";

export const fetchGalleryPrompts = async (offset: number, limit: number): Promise<Prompt[]> => {
  const response = await apiClient.get(`/gallery.json?offset=${offset}&limit=${limit}`);
  return response.data || [];
};

export const fetchUserPrompts = async (offset: number, limit: number): Promise<Prompt[]> => {
  const response = await apiClient.get(`/prompts?offset=${offset}&limit=${limit}`);
  return response.data || [];
};

export const createPrompt = async (formData: FormData): Promise<Prompt> => {
  const response = await apiClient2.post(`/prompts`, formData);
  return response.data;
};

export const retrievePrompt = async (tuneId: number, promptId: number): Promise<Prompt> => {
  const response = await apiClient.get(`/tunes/${tuneId}/prompts/${promptId}`);
  return response.data;
}

export const likePrompt = async (promptId: number) => {
  const response = await apiClient.post(`/prompts/${promptId}/like`);
  console.log(response);
  if (response.status === 200 ){
    return true;
  }
};

export const getTunes = async (
  page: number,
  limit: number,
  searchQuery: string
) => {
  const response = await apiClient.get(`/tunes?branch=flux1&model_type=lora&page=${page}&limit=${limit}&title=${searchQuery}`);
  return response.data;
};

export const trashPrompt = async (tuneId:number, promptId: number) => {
  const response = await apiClient.delete(`/tunes/${tuneId}/prompts/${promptId}`);
  if (response.status === 204) {
    return response.status;
  }
};