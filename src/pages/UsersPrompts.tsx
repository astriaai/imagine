import React, { useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import WithLayout from "@/components/WithLayout";
import PromptCard from "@/components/PromptCard";
import PromptForm from "@/components/PromptForm";
import usePrompts from "@/hooks/usePrompts";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import InfiniteScroll from "react-infinite-scroll-component";
import { format, isToday, isYesterday, parseISO } from "date-fns";

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
    } catch (e) {
      setError("An error occurred while loading more prompts. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [fetchMoreData, loading]);

  const lastPromptElementRef = useInfiniteScroll({
    loading,
    hasMore,
    loadMore: loadMorePrompts,
  });

  // Helper function to format date headers
  const formatDateHeader = (dateString: string) => {
    const date = parseISO(dateString);
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return format(date, "dd MMM yyyy");
  };

  // Group prompts by date
  const groupedPrompts = prompts.reduce((acc, prompt, index) => {
    const dateHeader = formatDateHeader(prompt.created_at);
    if (!acc[dateHeader]) acc[dateHeader] = [];
    acc[dateHeader].push({ ...prompt, originalIndex: index });
    return acc;
  }, {} as Record<string, (typeof prompts[0] & { originalIndex: number })[]>);

  return (
    <div className="flex-1 relative">
      <PromptForm />
      <div className="mx-auto overflow-hidden px-4">
        <InfiniteScroll
          dataLength={prompts.length}
          next={loadMorePrompts}
          hasMore={hasMore}
          loader={<Loader2 className="mx-auto animate-spin" />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          scrollThreshold={0.8}
          style={{ overflow: "hidden" }}
        >
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(groupedPrompts).map(([dateHeader, groupedPrompts]) => (
              <React.Fragment key={dateHeader}>
                <h2 className="text-xl font-semibold mt-4 mb-2 text-black">{dateHeader}</h2>
                {groupedPrompts.map((prompt, index) => (
                  <div
                    key={prompt.id || index}
                    ref={prompt.originalIndex === prompts.length - 1 ? lastPromptElementRef : null}
                  >
                    <PromptCard prompt={prompt} promptIndex={prompt.originalIndex + 1} />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default WithLayout(UsersPrompts);