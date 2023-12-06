import "./VideoModal.scss";
import cross from "../../assets/cross.png";

interface VideoModalProps {
  videoKey?: string;
  onClose: () => void;
}

const VideoModal = ({ videoKey, onClose }: VideoModalProps) => {
  if (!videoKey) {
    return <div className="video-modal">Invalid Video Key</div>;
  }

  return (
    <div className="video-modal">
      <div className="video-modal__cross-container">
        <img
          src={cross}
          className="video-modal__cross"
          alt="cross-icon"
          onClick={onClose}
        />
      </div>
      <iframe
        title="movie-trailer"
        src={`https://www.youtube.com/embed/${videoKey}`}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoModal;
