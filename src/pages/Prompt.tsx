import React, { useEffect, useState, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "@/store/promptStore";
import { usePromptNavigation } from "@/hooks/usePromptNavigation";
import WithPrompt from "@/components/WithLayout";
import PromptForm from "@/components/PromptForm";
import PromptImage from "@/components/PromptImage";
import PromptDetails from "@/components/PromptDetails";
import ImageZoom from "@/components/ImageZoom";
import usePrompts from "@/hooks/usePrompts";

const Prompt: React.FC = () => {
  const { id, index: indexString } = useParams<{ id: string; index: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { findPrompt } = usePrompts();
  const { galleryPrompts, userPrompts } = useStore();

  const [promptType, setPromptType] = useState<string>(
    location.state?.type || ""
  );
  const [zoomImage, setZoomImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const index = parseInt(indexString || "0", 10);
  const prompts = promptType === "gallery" ? galleryPrompts : userPrompts;
  const currentPromptIndex = prompts.findIndex(
    (prompt) => `${prompt?.id}` === id
  );
  const currentPrompt = prompts[currentPromptIndex];

  usePromptNavigation({
    currentPromptIndex,
    prompts,
    type: promptType,
    currentImageIndex: index,
  });

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();

        if (zoomImage) {
          setZoomImage(false);
        } else {
          navigate(promptType === "gallery" ? "/gallery" : "/", {
            replace: true,
          });
        }
      }
    },
    [zoomImage, promptType, navigate]
  );

  useEffect(() => {
    const determinePromptType = async () => {
      console.log({ promptType, id, galleryPrompts });
      if (!promptType && id) {
        setIsLoading(true);
        try {
          const determinedType = await findPrompt(parseInt(id, 10));
          if (determinedType === null) {
            navigate("/gallery", { replace: true });
          } else {
            setPromptType(determinedType);
          }
        } catch (error) {
          console.error("Error determining prompt type:", error);
          navigate("/gallery", { replace: true });
        } finally {
          setIsLoading(false);
        }
      }
    };

    determinePromptType();
  }, [id, promptType, findPrompt, navigate]);

  useEffect(() => {
    window.addEventListener("keydown", handleEscape, { capture: true });
    return () => {
      window.removeEventListener("keydown", handleEscape, { capture: true });
    };
  }, [handleEscape]);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!currentPrompt) {
    return null;
  }

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      <PromptForm />
      <div className="flex-1 p-0 md:p-4 overflow-auto">
        <div className="w-full h-full flex flex-col md:flex-row bg-light-mode">
          <PromptImage
            imageUrl={currentPrompt.images[index]}
            type={promptType}
            setDisplay={setZoomImage}
          />
          <PromptDetails
            prompt={currentPrompt}
            imageUrl={currentPrompt.images[index]}
          />
        </div>
      </div>
      <ImageZoom
        src={currentPrompt.images[index]}
        alt="Prompt image"
        display={zoomImage}
        setDisplay={setZoomImage}
      />
    </div>
  );
};

export default WithPrompt(Prompt);
