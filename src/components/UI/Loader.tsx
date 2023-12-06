import  { useEffect, useState } from 'react';
import gifLoader from '../../assets/loader.gif';
import './Loader.scss';

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Set the duration in milliseconds (e.g., 3000 milliseconds = 3 seconds)

    // Clear the timeout when the component unmounts or when data is loaded
    return () => clearTimeout(timeoutId);
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  return isVisible ? (
    <div className="loader-modal">
      <div className="loader-modal__content">
        <div className="loader__gif" style={{ backgroundImage: `url(${gifLoader})` }}></div>
      </div>
    </div>
  ) : null;
};

export default Loader;
