import arrowLeft from "../../assets/left-arrow.png";
import "./Arrow.scss";
type PrevButtonProps = {
  onClick: () => void;
};

const PrevButton = ({ onClick }: PrevButtonProps) => {
  return (
    <button onClick={onClick} className="arrow">
      <img src={arrowLeft} className="arrow__img" />
    </button>
  );
};

export default PrevButton;
