import arrowRight from "../../assets/right-arrow.png";
import "./Arrow.scss";

type NextButtonProps = {
  onClick: () => void;
};

const NextButton = ({ onClick }: NextButtonProps) => {
  return (
    <button onClick={onClick} className="arrow">
      <img src={arrowRight} className="arrow__img" alt="Right Arrow" />
    </button>
  );
};

export default NextButton;
