import React from "react";
import { Tune } from "@/types";
import { useNavigate } from "react-router-dom";


type TuneKeys = keyof Tune;

const PromptCard: React.FC<{ prompt: Tune }> = React.memo(({ prompt }) => {
  const navigate = useNavigate();

   const displayProperties: { key: TuneKeys; label: string }[] = [
    { key: 'ar', label: 'Aspect Ratio' },
    { key: 'style', label: 'Style' },
  ];

  return (
    <div
      key={prompt.created_at}
      className="mb-[4px] w-full cursor-pointer flex"
    >
      <div className="flex-1 grid grid-cols-4 gap-1 w-full">
        {prompt.images.map((image: string, i: number) => (
          <div
            key={i}
            className="flex items-center w-full justify-center rounded-lg overflow-hidden"
          >
            <img
              src={image}
              alt={`prompt-${i}`}
              className="object-cover w-full h-auto max-h-[900px]"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src =
                  "https://www.astria.ai/assets/logo-b4e21f646fb5879eb91113a70eae015a7413de8920960799acb72c60ad4eaa99.png";
              }}
              onClick={() => {
                navigate(`/prompt/${prompt.id}`, {
                  state: { type: "user", index: i },
                });
              }}
            />
          </div>
        ))}
      </div>
      <div className="w-[30%] p-2 flex flex-col text-sm">
        <p className="font-medium">{prompt.text}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {displayProperties.map(({ key, label }) => 
            prompt[key] && (
              <span key={key} className="text-gray-700 font-medium bg-slate-200 px-3 rounded-sm">
                {label}: {prompt[key]}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
});

export default PromptCard;
