import { ReactNode, useState, useEffect } from "react";
import NextButton from "./NextButton";
import "./Slider.scss";

type SliderProps<T> = {
  slides: T[];
  visibleItemsNumber?: number;
  children: (slide: T, isSelected: boolean) => ReactNode;
  selectedSlide?: T | null;
  onSelectItem: (index: number) => void;
};

const Slider = <T extends object>({
  slides,
  children,
  visibleItemsNumber = 3,
  selectedSlide = null,
  onSelectItem,
}: SliderProps<T>) => {
  const [start, setStart] = useState(0);

  const isControlsVisible = slides.length > visibleItemsNumber;

  const visibleItems = isControlsVisible
    ? slides
        .concat(slides.slice(0, visibleItemsNumber))
        .slice(start, start + visibleItemsNumber)
    : slides;

  useEffect(() => {
    if (selectedSlide) {
      const selectedIndex = slides.findIndex((item) => item === selectedSlide);
      setStart(
        selectedIndex >= 0
          ? selectedIndex % slides.length
          : Math.max(0, slides.length - visibleItemsNumber)
      );
    }
  }, [selectedSlide, slides, visibleItemsNumber]);

  const onNextClick = () => {
    const nextIndex = (start + 1) % slides.length;
    setStart(nextIndex);
    onSelectItem(nextIndex);
  };

  return (
    <div className="slider">
      <div className="slider__slides">
        <ul className="slider__list">
          {visibleItems.map((slide: T, index: number) => (
            <li
              key={index}
              className={selectedSlide === slide ? "selected" : ""}
            >
              {children ? children(slide, selectedSlide === slide) : null}
            </li>
          ))}
        </ul>
        <NextButton onClick={onNextClick} />
      </div>
    </div>
  );
};

export default Slider;
