import React from "react";
import { Button } from "../ui/button";
import { Copy, Heart, Trash, Check, Type } from "lucide-react";
import { Prompt } from "@/types";
import { useCopy } from "@/hooks/useCopy";
import { useLike } from "@/hooks/useLike";
import { useTrash } from "@/hooks/useTrash";
import { useAPrompt } from "@/hooks/useAPrompt";

interface ActionButtonsProps {
  prompt: Prompt;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ prompt }) => {
  const { isCopied, handleCopy } = useCopy();
  const { isLiked, handleLike } = useLike(prompt?.liked);
  const { isTrashed, handleTrash } = useTrash();

  const { isPromptUsed, handleUsePrompt } = useAPrompt();

  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleLike(prompt.id)}
        className="flex items-center gap-1"
      >
        <Heart className={`w-3 h-3 text-red-600 ${isLiked ? "fill-current" : ""}`} />
        <span className="hidden custom-lg:inline">{isLiked ? "Unlike" : "Like"}</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleUsePrompt(prompt)}
        className="flex items-center gap-1"
      >
        {isPromptUsed ? <Check className="w-3 h-3 text-green-600" /> : <Type className="w-3 h-3" />}
        <span className="hidden custom-lg:inline">Use</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleTrash(prompt.tune_id, prompt.id)}
        className="flex items-center gap-1"
      >
        {isTrashed ? <Check className="w-3 h-3 text-green-600" /> : <Trash className="w-3 h-3" />}
        <span className="hidden custom-lg:inline">{isTrashed ? "Trashed!" : "Trash"}</span>
      </Button>
      <Button variant="ghost" size="sm" onClick={() => handleCopy(prompt)} className="flex items-center gap-1">
        {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        <span className="hidden custom-lg:inline">{isCopied ? "Copied!" : "Copy"}</span>
      </Button>
    </div>
  );
};
