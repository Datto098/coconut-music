"use client";

import SlickSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slide from "./slide-image";
import "../../styles/slider-custome.css";
import { SliderImageProps } from "@/props/slider-props";

export default function SliderImage(params: SliderImageProps) {
  const { slideData, settings, className } = params;
  return (
    <div className={`${className}`}>
      <SlickSlider {...settings} className="slider">
        {slideData.map((slide, index) => {
          return <Slide image={slide.image} key={index} titleImage={slide.titleImage} />;
        })}
      </SlickSlider>
    </div>
  );
}
