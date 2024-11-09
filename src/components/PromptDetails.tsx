import React, { useState } from "react";
import { DownloadIcon, CheckIcon, CopyIcon, Heart, Type } from "lucide-react";
import { PromptDetailsProps } from "@/types";
import { useCopy } from "@/hooks/useCopy";
import { useLike } from "@/hooks/useLike";
import { useAPrompt } from "@/hooks/useAPrompt";


const PromptDetails: React.FC<PromptDetailsProps> = ({ prompt, imageUrl }) => {
  const { isLiked: initialIsLiked, handleLike } = useLike(prompt?.liked);
  const { isCopied, handleCopy } = useCopy();
  const { isPromptUsed, handleUsePrompt } = useAPrompt();

  // Local state to track like status and like count
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Update the like status and like count in the UI
    setIsLiked((prev) => !prev);
    // Call the hook's handleLike function to handle backend update
    handleLike(prompt.id);
  };

  // Function to handle downloading the prompt image
  const handleDownload = () => {
    if (imageUrl) {
      const element = document.createElement("a");
      element.href = imageUrl;
      element.download = `${prompt?.id || "image"}.png`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <div className="hidden md:w-2/5 lg:w-1/3 h-full md:flex flex-col justify-between rounded-xl p-4 shadow-lg bg-white">
      <div>
        <div className="flex mb-2 justify-between items-center">
          <h2 className="text-lg font-semibold">{prompt?.id}</h2>
          <div className="p-2 flex items-center gap-1">
            <button
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={handleDownload}
            >
              <DownloadIcon className="text-gray-600 w-4 h-4" />
            </button>
            <button
              className={`p-2 rounded-full hover:bg-gray-100 ${isPromptUsed ? "text-green-500" : "text-gray-600"
              }`}
              onClick={() => handleUsePrompt(prompt)}
            >
              {isPromptUsed ? (
              <CheckIcon className="w-4 h-4 text-green-500" />
              ) : (
              <Type className="w-4 h-4" />
              )}
            </button>
            <button
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => handleCopy(prompt)}
            >
              {isCopied ? (
                <>
                  <CheckIcon className="text-green-500 w-4 h-4" />
                </>
              ) : (
                <>
                  <CopyIcon className="text-gray-600 w-4 h-4" />
                </>
              )}
            </button>
            <button
              className={`p-2 rounded-full hover:bg-gray-100 ${isLiked ? "text-red-500" : "text-gray-600"
                }`}
              onClick={toggleLike}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>
        <p className="overflow-y-auto max-h-48 text-sm text-gray-700">
          {prompt?.text?.length > 100 ? `${prompt?.text.slice(0, 200)}...` : prompt?.text}
        </p>
      </div>
      <div className="flex justify-center p-2 mt-2">
      </div>
    </div>
  );
};

export default PromptDetails;
