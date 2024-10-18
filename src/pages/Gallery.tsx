import React from "react";
import WithLayout from "@/components/WithLayout";
import PromptForm from "@/components/PromptForm";
import MasonryGallery from "@/components/MasonryGallery";
import usePrompts from "@/hooks/usePrompts";

const Gallery: React.FC = () => {
  const { prompts, fetchMoreData } = usePrompts(true);

  return (
    <div className="bg-white flex-1 relative">
      <PromptForm />
      <MasonryGallery prompts={prompts} fetchMoreData={fetchMoreData} />
    </div>
  );
};

export default WithLayout(Gallery);
