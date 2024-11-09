import { useEffect, useCallback, useRef } from "react";
import { useStore } from "@/store/promptStore";
import { fetchGalleryPrompts, fetchUserPrompts } from "@/api/prompts";
import type { Prompt } from "../types";

export type PromptType = "user" | "gallery" | null;

interface UsePromptsResult {
  galleryPrompts: Prompt[];
  userPrompts: Prompt[];
  fetchMoreData: (isGallery: boolean) => Promise<boolean>;
  findPrompt: (promptId: number) => Promise<PromptType>;
}

const usePrompts = (promptId?: number): UsePromptsResult => {
  const {
    galleryPrompts,
    userPrompts,
    galleryOffset,
    userOffset,
    limit,
    addGalleryPrompts,
    addUserPrompts,
  } = useStore();

  const initialized = useRef(false);

  const fetchMoreData = useCallback(async (isGallery: boolean): Promise<boolean> => {
    try {
      const prompts = isGallery
        ? await fetchGalleryPrompts(galleryOffset, limit)
        : await fetchUserPrompts(userOffset, limit);

      if (!prompts?.length) {
        return false;
      }

      if (isGallery) {
        addGalleryPrompts(prompts);
      } else {
        addUserPrompts(prompts);
      }
      return true;
    } catch (error) {
      console.error(`Error fetching ${isGallery ? "gallery" : "user"} prompts:`, error);
      return false;
    }
  }, [galleryOffset, userOffset, limit, addGalleryPrompts, addUserPrompts]);

  const findPrompt = useCallback(async (searchPromptId: number): Promise<PromptType> => {
    const checkPrompts = () => {
      const foundInUser = userPrompts.some((prompt) => prompt.id === searchPromptId);
      const foundInGallery = galleryPrompts.some((prompt) => prompt.id === searchPromptId);
      return { foundInUser, foundInGallery };
    };

    let { foundInUser, foundInGallery } = checkPrompts();
    if (foundInUser) return "user";
    if (foundInGallery) return "gallery";

    let userExhausted = false;
    let galleryExhausted = false;
    let attemptCount = 0; // Limit attempts to avoid infinite loop

    while (!userExhausted || !galleryExhausted) {
      attemptCount += 1;
      if (attemptCount > 5) break; // Limit fetch attempts

      const userPromise: Promise<boolean> = !userExhausted 
        ? fetchMoreData(false) 
        : Promise.resolve(false);
      
      const galleryPromise: Promise<boolean> = !galleryExhausted 
        ? fetchMoreData(true) 
        : Promise.resolve(false);

      const [hasMoreUserPrompts, hasMoreGalleryPrompts] = await Promise.all([
        userPromise,
        galleryPromise,
      ]);

      ({ foundInUser, foundInGallery } = checkPrompts());
      if (foundInUser) return "user";
      if (foundInGallery) return "gallery";

      userExhausted = !hasMoreUserPrompts;
      galleryExhausted = !hasMoreGalleryPrompts;
    }

    return null;
  }, [userPrompts, galleryPrompts, fetchMoreData]);


  useEffect(() => {
    const initializePrompts = async () => {
      if (initialized.current) return;
      initialized.current = true;

      if (promptId) {
        await findPrompt(promptId);
      }
      
      if (galleryPrompts.length === 0) {
        await fetchMoreData(true);
      }
      if (userPrompts.length === 0) {
        await fetchMoreData(false);
      }
    };

    initializePrompts();
  }, [promptId, fetchMoreData, findPrompt]);

  return {
    galleryPrompts,
    userPrompts,
    fetchMoreData,
    findPrompt,
  };
};

export default usePrompts;
