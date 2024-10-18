import { useEffect } from "react";
import { useStore } from "@/store/promptStore";
import { fetchGalleryPrompts, fetchUserPrompts } from "@/api/prompts";

const usePrompts = (isGallery: boolean) => {
  const {
    galleryPrompts,
    userPrompts,
    galleryOffset,
    userOffset,
    limit,
    addGalleryPrompts,
    addUserPrompts,
  } = useStore();

  const fetchMoreData = async () => {
    try {
      const prompts = isGallery
      ? await fetchGalleryPrompts(galleryOffset, limit)
      : await fetchUserPrompts(userOffset, limit);  
      
      if (prompts.length === 0) {
        console.log("i ran")
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
  };

  useEffect(() => {
    if (isGallery && galleryPrompts.length === 0) {
      fetchMoreData();
    } else if (!isGallery && userPrompts.length === 0) {
      fetchMoreData();
    }
  }, [isGallery, galleryPrompts.length, userPrompts.length, galleryOffset, userOffset]);

  return {
    prompts: isGallery ? galleryPrompts : userPrompts,
    fetchMoreData,
  };
};

export default usePrompts;
