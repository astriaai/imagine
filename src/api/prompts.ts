import { apiClient } from "@/services/apiClient";
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
  const response = await apiClient.post(`/prompts`, formData);
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
