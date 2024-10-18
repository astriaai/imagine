import { create } from "zustand";
import { PromptsState } from "@/types";

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
}));
