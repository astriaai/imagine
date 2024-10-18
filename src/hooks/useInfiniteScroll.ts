import { useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
  loading: boolean;
  hasMore: boolean;
  loadMore: () => Promise<void>;
}

export const useInfiniteScroll = ({
  loading,
  hasMore,
  loadMore,
}: UseInfiniteScrollProps) => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const lastPromptElementRef = (node: HTMLDivElement | null) => {
    if (loading || !hasMore) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    if (node) observer.current.observe(node);
  };

  return lastPromptElementRef;
};
