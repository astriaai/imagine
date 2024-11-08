import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/promptStore";
import { Prompt } from "@/types";
import { ImageGrid } from "./ImageGrid";
import { PropertiesDisplay } from "./PropertiesDisplay";
import { ActionButtons } from "./ActionButtons";
import usePromptPolling from "@/hooks/usePromptPolling";

interface PromptCardProps {
  prompt: Prompt;
  promptIndex: number;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt: initialPrompt, promptIndex }) => {
  const navigate = useNavigate();
  const { retrieveSinglePrompt, updateSinglePrompt } = useStore();
  const retrievedPrompt = usePromptPolling(initialPrompt, retrieveSinglePrompt, updateSinglePrompt);
  const displayPrompt = retrievedPrompt || initialPrompt;

  const handleImageClick = (index: number) => {
    navigate(`/prompt/${displayPrompt.id}`, { state: { type: "user", index } });
  };

  return (
    <div className="relative mb-4 w-full cursor-pointer flex flex-col-reverse md:flex-row group">
      <ImageGrid images={displayPrompt.images} onClick={handleImageClick} />
      <div className="md:w-[30%] px-0 py-2 md:py-0 md:px-2 flex flex-col text-sm text-black">
        <div className="flex-1 order-2 md:order-1">
          <p className="font-medium">
            {displayPrompt.text?.length > 100 ? `${displayPrompt.text.slice(0, 100)}...` : displayPrompt.text}
          </p>
          <PropertiesDisplay prompt={displayPrompt} />
        </div>
        <div className="order-1 md:order-2 flex justify-between items-center md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="font-medium block md:hidden">{promptIndex}</p>
          <ActionButtons prompt={displayPrompt} />
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
