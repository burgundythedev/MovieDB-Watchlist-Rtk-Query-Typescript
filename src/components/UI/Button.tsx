import { ReactNode, MouseEvent } from "react";
import "./Button.scss";

interface ButtonProps {
  className?: string;
  type?: "view-all" | "view";
  children: ReactNode;
  icon?: string | undefined;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ className, type, children, onClick, icon }: ButtonProps) => {
  const buttonClassName = `button ${className || ""} ${
    type ? `button--${type}` : ""
  }`;

  return (
    <button className={buttonClassName} onClick={onClick}>
      {icon && <img className="button__icon" src={icon} alt="icon" />}
      {children}
    </button>
  );
};

export default Button;
