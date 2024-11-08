import { useState } from "react";
import { trashPrompt } from "@/api/prompts";
import { useStore } from "@/store/promptStore";


export const useTrash = () => {
    const [isTrashed, setIsTrashed] = useState(false);
    const { removeSinglePrompt } = useStore();

    const handleTrash = async (tuneId:number, promptId: number) => {
        if (promptId) {
            const response = await trashPrompt(tuneId, promptId);
            if (response === 204) {
                setIsTrashed(!isTrashed);
                removeSinglePrompt(promptId);
            }
        }
    };

    return { isTrashed, handleTrash };
};
