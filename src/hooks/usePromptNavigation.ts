import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tune } from "@/types";

export const usePromptNavigation = (
  currentPromptIndex: number,
  prompts: Tune[],
  type: string,
  currentImageIndex: number
) => {
  const navigate = useNavigate();

  const navigateToNext = () => {
    const nextIndex = currentPromptIndex + 1;

    if (nextIndex < prompts.length) {
      const nextImageIndex = currentImageIndex + 1;
      const images = prompts[currentPromptIndex].images;

      console.log(`/prompt/${prompts[currentPromptIndex].id}`, { type, index: nextImageIndex })
      if (nextImageIndex < images.length) {
        navigate(`/prompt/${prompts[currentPromptIndex].id}`, {
          state: { type, index: nextImageIndex },
        });
      } else {
        navigate(`/prompt/${prompts[nextIndex].id}`, {
          state: { type, index: 0 },
        });
      }
    }
  };

  const navigateToPrevious = () => {
    const previousIndex = currentPromptIndex - 1;
    const images = prompts[previousIndex].images;

    if (previousIndex >= 0) {
      const previousImageIndex = currentImageIndex - 1;

      if (previousImageIndex >= 0) {
        navigate(`/prompt/${prompts[currentPromptIndex].id}`, {
          state: { type, index: previousImageIndex },
        });
      } else {
        navigate(`/prompt/${prompts[previousIndex].id}`, {
          state: { type, index: images.length - 1 },
        });
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        navigateToNext();
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        navigateToPrevious();
      }
    };

    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        navigateToNext();
      } else if (event.deltaY < 0) {
        navigateToPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleScroll);
    };
  }, [currentPromptIndex, currentImageIndex, prompts]);

  // Return the navigation functions for potential external use
  return { navigateToNext, navigateToPrevious };
};
