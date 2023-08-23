import { SlideImageProps } from "@/props/slide-props";
import Image from "next/image";
import "../../styles/slider-custome.css";

export default function Slide(params: SlideImageProps) {
  const { image, titleImage } = params;
  return (
    <div className="slide">
      <Image
        src={image}
        alt={titleImage ? titleImage : ""}
        width={400}
        height={360}
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
