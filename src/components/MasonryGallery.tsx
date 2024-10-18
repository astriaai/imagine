import React, { useState } from "react";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Clipboard, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tune } from "@/types";

interface MasonryGalleryProps {
  prompts: Tune[];
  fetchMoreData: () => Promise<boolean>;
}

const MasonryGallery: React.FC<MasonryGalleryProps> = ({
  prompts,
  fetchMoreData,
}) => {
  const navigate = useNavigate();
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const loadMorePrompts = async () => {
    if (isLoading) return; // Prevent multiple fetches
    setIsLoading(true);
    try {
      const hasMoreData = await fetchMoreData();
      setHasMore(hasMoreData);
    } catch (error) {
      console.error("Failed to load more data", error);
      setHasMore(false); // Stop loading on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-[1140px] mx-auto overflow-hidden">
      {" "}
      {/* Ensure no overflow */}
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
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-[2px] rounded-t-xl overflow-hidden"
          columnClassName="pl-[2px] bg-clip-padding"
        >
          {prompts.map((prompt) => (
            <div
              key={prompt.id}
              className="mb-[2px] cursor-pointer"
              onClick={() =>
                navigate(`/prompt/${prompt.id}`, { state: { type: "gallery", index: 0 } })
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
                    {prompt.id}
                  </div>
                  <div className="text-white flex">
                    <div className="mr-2 hover:bg-white hover:bg-opacity-20 p-2 rounded-full cursor-pointer">
                      <Clipboard size={18} />
                    </div>
                    <div className="hover:bg-white hover:bg-opacity-20 p-2 rounded-full cursor-pointer">
                      <HeartIcon className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
};

export default MasonryGallery;
