import React from "react";
import WithPrompt from "@/components/WithLayout";
import PromptForm from "@/components/PromptForm";
import { useParams, useLocation } from "react-router-dom";
import { useStore } from "@/store/promptStore";
import PromptImage from "@/components/PromptImage";
import PromptDetails from "@/components/PromptDetails";
import { usePromptNavigation } from "@/hooks/usePromptNavigation";

const Prompt: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { type, index } = location.state || {};
  const { galleryPrompts, userPrompts } = useStore();

  const prompts = type === "gallery" ? galleryPrompts : userPrompts;
  const currentPromptIndex = prompts.findIndex((e) => `${e.id}` === id);
  const prompt = prompts[currentPromptIndex];

  usePromptNavigation(currentPromptIndex, prompts, type, index);

  if (!prompt) {
    return (
      <div className="p-8 text-center text-red-500">Prompt not found.</div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden bg-light-mode">
      <PromptForm />
      <div className="flex-1 p-4 overflow-auto">
        <div className="w-full h-full flex flex-col md:flex-row bg-light-mode">
          <PromptImage imageUrl={prompt.images[index as number]} type={type}/>
          <PromptDetails prompt={prompt} />
        </div>
      </div>
    </div>
  );
};

export default WithPrompt(Prompt);
