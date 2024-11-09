import React, { useState } from "react";
import { Heart } from "lucide-react";
import { Clipboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLike } from "@/hooks/useLike";
import { useCopy } from "@/hooks/useCopy";
import { Prompt } from "@/types";

interface GalleryItemProps {
  prompt: Prompt;
  index: number;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ prompt, index }) => {
  const navigate = useNavigate();
  const { isLiked: initialIsLiked, handleLike } = useLike(prompt.liked);
  const { isCopied, handleCopy } = useCopy();

  // Local state to track like status and like count
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(prompt.prompt_likes_count);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Update the like status and like count in the UI
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));

    // Call the hook's handleLike function to handle backend update
    handleLike(prompt.id);
  };

  return (
    <div
      key={prompt.id}
      className="mb-[2px] cursor-pointer"
      onClick={() =>
        navigate(`/prompt/${prompt.id}/0`, { state: { type: "gallery" } })
      }
    >
      <div className="relative group">
        <img
          className="w-full h-auto max-w-full max-h-[600px] object-cover"
          src={
            prompt.images?.[0] ??
            "https://www.astria.ai/assets/logo-b4e21f646fb5879eb91113a70eae015a7413de8920960799acb72c60ad4eaa99.png"
          }
          alt={`Image ${prompt.id}`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://www.astria.ai/assets/logo-b4e21f646fb5879eb91113a70eae015a7413de8920960799acb72c60ad4eaa99.png";
          }}
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black from-0% bg-opacity-50 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-center">
          <div className="text-sm text-white font-medium hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-full cursor-pointer">
            {index + 1}
          </div>
          <div className="text-white flex">
            <button
              className={`p-2 rounded-full transition-colors ${isCopied ? "bg-green-500" : "hover:bg-white/20"}`}
              onClick={(e) => {
                e.stopPropagation();
                handleCopy(prompt);
              }}
              aria-label="Copy prompt text"
            >
              <Clipboard className="w-4 h-4" />
            </button>

            <button
              className={`p-2 rounded-full transition-colors flex items-center gap-1 ${isLiked ? "text-red-500" : "hover:bg-white/20"}`}
              onClick={toggleLike}
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              <span className="text-xs">{likeCount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;
