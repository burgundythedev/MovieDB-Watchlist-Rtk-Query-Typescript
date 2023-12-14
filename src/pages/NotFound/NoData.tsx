
import Button from "../../components/UI/Button";
import "./NoData.scss";

interface NoDataProps {
  onBack: () => void;
}

const NoData: React.FC<NoDataProps> = ({ onBack }) => {
  return (
    <div className="nodata">
      <h1 className="nodata__text">
        No flicks found in this collection. Retreat and uncover your destiny. 😎
      </h1>
      <Button type="view" children="Back" onClick={onBack} />
    </div>
  );
};

export default NoData;
