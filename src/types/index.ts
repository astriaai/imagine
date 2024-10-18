export interface Tune {
  id: number;
  callback: string | null;
  trained_at: string;
  started_training_at: string;
  created_at: string;
  updated_at: string;
  tune_id: number;
  text: string;
  negative_prompt: string;
  cfg_scale: number | null;
  steps: number | null;
  super_resolution: boolean;
  ar: string;
  num_images: number;
  seed: number | null;
  controlnet_conditioning_scale: number | null;
  controlnet_txt2img: boolean;
  denoising_strength: number | null;
  style: string | null;
  url: string;
  images: string[];
}

export interface PromptsState {
  galleryPrompts: Tune[];
  userPrompts: Tune[];
  galleryOffset: number;
  userOffset: number;
  limit: number;
  addGalleryPrompts: (prompts: Tune[]) => void;
  addUserPrompts: (prompts: Tune[]) => void;
}


export interface PromptDetailsProps {
  prompt: Tune;
}