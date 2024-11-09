
// hooks/usePromptNavigation.ts
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Prompt } from '../types';

interface PromptNavigationHookResult {
  navigateToNext: () => void;
  navigateToPrevious: () => void;
}

interface UsePromptNavigationProps {
  currentPromptIndex: number;
  prompts: Prompt[];
  type: string;
  currentImageIndex: number;
}

export const usePromptNavigation = ({
  currentPromptIndex,
  prompts,
  type,
  currentImageIndex,
}: UsePromptNavigationProps): PromptNavigationHookResult => {
  const navigate = useNavigate();

  const navigateToNext = useCallback(() => {
    const currentPrompt = prompts[currentPromptIndex];
    if (!currentPrompt) return;

    const nextImageIndex = currentImageIndex + 1;
    
    // Check if we can move to the next image in the current prompt
    if (nextImageIndex < currentPrompt.images.length) {
      navigate(`/prompt/${currentPrompt.id}/${nextImageIndex}`, {
        state: { type },
        replace: true,
      });
      return;
    }

    // Move to the next prompt
    const nextPromptIndex = currentPromptIndex + 1;
    if (nextPromptIndex < prompts.length) {
      navigate(`/prompt/${prompts[nextPromptIndex].id}/0`, {
        state: { type },
        replace: true,
      });
    }
  }, [currentPromptIndex, currentImageIndex, prompts, type, navigate]);

  const navigateToPrevious = useCallback(() => {
    const currentPrompt = prompts[currentPromptIndex];
    if (!currentPrompt) return;

    const previousImageIndex = currentImageIndex - 1;
    
    // Check if we can move to the previous image in the current prompt
    if (previousImageIndex >= 0) {
      navigate(`/prompt/${currentPrompt.id}/${previousImageIndex}`, {
        state: { type },
        replace: true,
      });
      return;
    }

    // Move to the previous prompt
    const previousPromptIndex = currentPromptIndex - 1;
    if (previousPromptIndex >= 0) {
      const previousPrompt = prompts[previousPromptIndex];
      navigate(
        `/prompt/${previousPrompt.id}/${previousPrompt.images.length - 1}`,
        {
          state: { type },
          replace: true,
        }
      );
    }
  }, [currentPromptIndex, currentImageIndex, prompts, type, navigate]);

  useEffect(() => {
    let touchStartX = 0;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          navigateToNext();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          navigateToPrevious();
          break;
      }
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (event.deltaY > 0) {
        navigateToNext();
      } else if (event.deltaY < 0) {
        navigateToPrevious();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0].clientX;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const touchEndX = event.changedTouches[0].clientX;
      const SWIPE_THRESHOLD = 50;
      
      if (touchStartX - touchEndX > SWIPE_THRESHOLD) {
        navigateToNext();
      } else if (touchEndX - touchStartX > SWIPE_THRESHOLD) {
        navigateToPrevious();
      }
    };

    // Add event listeners with passive: false for better scroll performance
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [navigateToNext, navigateToPrevious]);

  return { navigateToNext, navigateToPrevious };
};
