import React, { useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import WithLayout from "@/components/WithLayout";
import PromptCard from "@/components/PromptCard";
import PromptForm from "@/components/PromptForm";
import usePrompts from "@/hooks/usePrompts";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const UsersPrompts: React.FC = () => {
  const { prompts, fetchMoreData } = usePrompts(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMorePrompts = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    setError(null);
    try {
      const hasMoreData = await fetchMoreData();
      setHasMore(hasMoreData);
    } catch (error) {
      setError("Failed to load more prompts.");
    } finally {
      setLoading(false);
    }
  }, [fetchMoreData, loading]);

  const lastPromptElementRef = useInfiniteScroll({
    loading,
    hasMore,
    loadMore: loadMorePrompts,
  });

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden bg-gray-100 scrollbar-hide">
      <div className="flex-1 h-full relative">
        <PromptForm />
        <div className="p-4 absolute top-0 w-full h-screen overflow-auto">
          <div className="max-w-7xl pt-28 w-full mx-auto overflow-hidden scrollbar-hide">
            {error && <p className="text-center text-red-500 mb-4">{error}</p>}
            {prompts.length > 1 &&
              prompts.map((prompt, index) => (
                <div
                  key={prompt.id || index}
                  className="overflow-hidden"
                  ref={
                    index === prompts.length - 1 ? lastPromptElementRef : null
                  }
                >
                  <PromptCard prompt={prompt} />
                </div>
              ))}
            {loading && (
              <div className="grid w-full overflow-clip place-items-center h-full py-4">
                <Loader2 className="animate-spin text-blue-500" size={24} />
              </div>
            )}
            {!hasMore && (
              <p className="text-center text-gray-500 py-4">
                You've reached the end!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithLayout(UsersPrompts);
