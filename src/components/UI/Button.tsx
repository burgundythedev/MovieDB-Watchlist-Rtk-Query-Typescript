import { ReactNode, MouseEvent } from "react";
import "./Button.scss";

interface ButtonProps {
  className?: string;
  type?: "primary" | "secondary" | "third";
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ className, type, children, onClick }: ButtonProps) => {
  const buttonClassName = `button ${className || ""} ${
    type ? `button--${type}` : ""
  }`;

  return (
    <button className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
