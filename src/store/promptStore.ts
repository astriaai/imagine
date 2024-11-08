import { create } from "zustand";
import { PromptsState } from "@/types";
import { fetchGalleryPrompts, fetchUserPrompts, retrievePrompt } from "@/api/prompts";

export const useStore = create<PromptsState>((set) => ({
  galleryPrompts: [],
  userPrompts: [],
  galleryOffset: 0,
  userOffset: 0,
  limit: 20,

  addGalleryPrompts: (prompts) =>
    set((state) => ({
      galleryPrompts: [...state.galleryPrompts, ...prompts],
      galleryOffset: state.galleryOffset + prompts.length,
    })),

  addUserPrompts: (prompts) =>
    set((state) => ({
      userPrompts: [...state.userPrompts, ...prompts],
      userOffset: state.userOffset + prompts.length,
    })),

  resetGalleryPrompts: () =>
    set({
      galleryPrompts: [],
      galleryOffset: 0,
    }),

  resetUserPrompts: () =>
    set({
      userPrompts: [],
      userOffset: 0,
    }),

  refreshGalleryPrompts: async () => {
    const prompts = await fetchGalleryPrompts(0, 20); // Fetch first set
    set({ galleryPrompts: prompts, galleryOffset: prompts.length }); // Update state with new prompts
  },

  refreshUserPrompts: async () => {
    const prompts = await fetchUserPrompts(0, 20); // Fetch first set
    set({ userPrompts: prompts, userOffset: prompts.length }); // Update state with new prompts
  },

  retrieveSinglePrompt: async (tuneId: number, promptId: number) => {
    const prompt = await retrievePrompt(tuneId, promptId);
    return prompt;
  },
  removeSinglePrompt: (promptId: number) => {
    set((state) => {
      const userPrompts = state.userPrompts.filter((p) => p.id !== promptId);
      return { userPrompts };
    });
  },

  updateSinglePrompt: async (tuneId: number, promptId: number) => {
    // Update the prompt in the store
    const prompt = await retrievePrompt(tuneId, promptId);
    set((state) => {
      const userPrompts = state.userPrompts.map((p) => {
        if (p.id === promptId) {
          return prompt;
        }
        return p;
      });

      return { userPrompts };
    });
  },
}));
