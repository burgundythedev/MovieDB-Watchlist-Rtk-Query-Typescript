import { ReactNode, useState, useEffect } from "react";
import NextButton from "./NextButton";
import "./Slider.scss";
import PrevButton from "./PrevButton";
import Button from "../UI/Button";

type SliderProps<T> = {
  slides: T[];
  visibleItemsNumber?: number;
  children: (slide: T, isSelected: boolean) => ReactNode;
  selectedSlide?: T | null;
  onSelectItem: (index: number) => void;
  isGrid: boolean; 
};

const Slider = <T extends object>({
  slides,
  children,
  visibleItemsNumber = 3,
  selectedSlide = null,
  onSelectItem,
  isGrid, 
}: SliderProps<T>) => {
  const [start, setStart] = useState(0);

  const isControlsVisible = slides.length > visibleItemsNumber;

  const visibleItems = isControlsVisible
    ? slides
        .concat(slides.slice(0, visibleItemsNumber))
        .slice(start, isGrid ? slides.length : start + visibleItemsNumber)
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

  const onPrevClick = () => {
    const prevIndex = (start - 1 + slides.length) % slides.length;
    setStart(prevIndex);
    onSelectItem(prevIndex);
  };

  const onNextClick = () => {
    const nextIndex = (start + 1) % slides.length;
    setStart(nextIndex);
    onSelectItem(nextIndex);
  };

  const toggleGrid = () => {
   
    onSelectItem(-1); 
  };

  return (
    <div className="slider">
        <Button className="slider__toggle-button" onClick={toggleGrid}>
          {isGrid ? 'Minimize List' : 'View All'}
        </Button>
      <div className="slider__slides">
        {!isGrid && <PrevButton onClick={onPrevClick} />}
        <ul className={`slider__list${isGrid ? '--grid' : ''}`}>
          {visibleItems.map((slide: T, index: number) => (
            <li
              key={index}
              className={selectedSlide === slide ? "selected" : ""}
            >
              {children ? children(slide, selectedSlide === slide) : null}
            </li>
          ))}
        </ul>
        {!isGrid && <NextButton onClick={onNextClick} />}
      </div>
      
    </div>
  );
};

export default Slider;
