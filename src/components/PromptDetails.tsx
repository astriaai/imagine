import React from "react";
import { HeartIcon, DownloadIcon } from "lucide-react";
import { PromptDetailsProps } from "@/types";

const PromptDetails: React.FC<PromptDetailsProps> = ({ prompt }) => {
  return (
    <div className="w-full md:w-1/3 h-full flex flex-col justify-between rounded-xl p-6 shadow-lg bg-white">
      <div>
        <div className="flex mb-5 justify-between items-center">
          <h2 className="text-lg font-semibold">{prompt.id}</h2>
          <div className="p-2 flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <DownloadIcon className="text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <HeartIcon className="text-gray-600" />
            </button>
          </div>
        </div>
        <p className="overflow-y-auto max-h-48 text-sm text-gray-700">
          {prompt.text}
        </p>
      </div>
      <div className="flex justify-center p-2 mt-4">
        <button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-700 hover:text-white transition duration-200">
          Copy Prompt
        </button>
      </div>
    </div>
  );
};

export default PromptDetails;
