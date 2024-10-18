import { apiClient } from "@/services/apiClient";
import { Tune } from "@/types";

export const fetchGalleryPrompts = async (offset: number, limit: number): Promise<Tune[]> => {
  const response = await apiClient.get(`/prompts?offset=${offset}&limit=${limit}`);
  return response.data || [];
};

export const fetchUserPrompts = async (offset: number, limit: number): Promise<Tune[]> => {
  const response = await apiClient.get(`/prompts?offset=${offset}&limit=${limit}`);
  return response.data || [];
};
