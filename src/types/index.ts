export interface Prompt {
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
  controlnet_conditioning_scale: number;
  controlnet_txt2img: boolean;
  denoising_strength: number;
  style: string | null;
  url: string;
  images: string[];
  prompt_likes_count: number;
  liked: boolean;
  w: number;
  h: number;
  scheduler: string | null;
  color_grading: string;
  film_grain: boolean;
  only_upscale: boolean;
  tiled_upscale: boolean;
  hires_fix: boolean;
  face_correct: boolean;
  face_swap: boolean;
  inpaint_faces: boolean;
  is_multiperson: boolean;
  prompt_expansion: boolean;
  theme: string | null;
  input_image: string | null;
  mask_image: string | null;
  controlnet: string;
  use_lpw: boolean;
}

export interface Tune {
  id: number;
  callback: string | null;
  created_at: string;
  eta: string;
  expires_at: string;
  is_api: boolean;
  model_type: string;
  name: string;
  orig_images: string[];
  started_training_at: string;
  title: string;
  token: string;
  trained_at: string;
  updated_at: string;
  url: string;
}

export interface PromptsState {
  galleryPrompts: Prompt[];
  userPrompts: Prompt[];
  galleryOffset: number;
  userOffset: number;
  limit: number;
  addGalleryPrompts: (prompts: Prompt[]) => void;
  addUserPrompts: (prompts: Prompt[]) => void;
  resetGalleryPrompts: () => void;
  resetUserPrompts: () => void;
  refreshGalleryPrompts: () => Promise<void>;
  refreshUserPrompts: () => Promise<void>;
  retrieveSinglePrompt: (tuneId: number, promptId: number) => Promise<Prompt>;
  removeSinglePrompt: (promptId: number) => void;
  updateSinglePrompt: (tuneId: number, promptId: number) => Promise<void>;
}


export interface PromptDetailsProps {
  prompt: Prompt;
  imageUrl: string;
}

export type ErrorObject = {
  [key in keyof Prompt]?: string[];
};


export interface PromptFormState {
  promptText: string; setPromptText: (text: string) => void;
  width: number; setWidth: (width: number) => void;
  height: number; setHeight: (height: number) => void;
  controlNet: string; setControlNet: (controlNet: string) => void;
  colorGrading: string; setColorGrading: (colorGrading: string) => void;
  filmGrain: boolean; setFilmGrain: (filmGrain: boolean) => void;
  superResolution: boolean; setSuperResolution: (superResolution: boolean) => void;
  hiresFix: boolean; setHiresFix: (hiresFix: boolean) => void;
  inpaintFaces: boolean; setInpaintFaces: (inpaintFaces: boolean) => void;
  faceCorrect: boolean; setFaceCorrect: (faceCorrect: boolean) => void;
  faceSwap: boolean; setFaceSwap: (faceSwap: boolean) => void;
  denoisingStrength: number; setDenoisingStrength: (denoisingStrength: number) => void;
  conditioningScale: number; setConditioningScale: (conditioningScale: number) => void;
  numImages: number; setNumImages: (numImages: number) => void;
  loraTextList: string[]; setLoraTextList: (loraTextList: string[]) => void;
  error: ErrorObject; setError: (error: ErrorObject) => void;
  isLoading: boolean; setIsLoading: (isLoading: boolean) => void;
}