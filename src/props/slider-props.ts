import { MusicDataProps } from "./music-props";
import { SlideImageProps } from "./slide-props";

export interface SliderImageProps {
  slideData: Array<SlideImageProps>;
  settings: Object;
  className?: string;
}

export interface SliderMusicProps {
  slideData: Array<MusicDataProps>;
  settings: Object;
  type: string;
  className?: string;
}
