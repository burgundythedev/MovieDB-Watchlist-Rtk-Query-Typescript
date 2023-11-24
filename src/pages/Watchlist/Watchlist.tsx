import PopMoviesWL from "./PopMoviesWL";
import ShowWL from "./ShowWL";
import UpcomingWL from "./UpcomingWL";
import "./Watchlist.scss";

const Watchlist = () => {
  return (
    <div className="watchlist">
      <PopMoviesWL />
      <UpcomingWL />
      <ShowWL />
    </div>
  );
};

export default Watchlist;
