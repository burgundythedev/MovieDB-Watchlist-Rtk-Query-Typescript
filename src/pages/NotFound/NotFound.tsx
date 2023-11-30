import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import "./NotFound.scss";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };
  return (
    <div className="notfound">
      <h2 className="notfound__title">404 - Not Found</h2>
      <p className="notfound__message">
        The page you are looking for does not exist.
      </p>
      <Button children="Back to Homepage" onClick={handleBackHome} />
    </div>
  );
};

export default NotFound;
