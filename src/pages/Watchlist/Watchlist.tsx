import PopMoviesWL from "./PopMoviesWL";
import ShowWL from "./ShowWL";
import UpcomingWL from "./UpcomingWL";

const Watchlist = () => {
  return (
    <div>
      <h1>Watchlist</h1>
      <PopMoviesWL />
      <UpcomingWL />
      <ShowWL />
    </div>
  );
};

export default Watchlist;
