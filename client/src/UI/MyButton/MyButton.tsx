import { DetailedHTMLProps, FC, ReactNode } from "react";
import classes from './MyButton.module.css';
import { HtmlHTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";
import { IoCaretBackSharp } from "react-icons/io5";

interface IMyButton
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
}

const MyButton: FC<IMyButton> = ({ children, className = '', ...props }) => {
  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
  };

  return (
    <button {...props} className={`${classes.button} ${className}`} onClick={back}>
      {children}
    </button>
  );
};

export default MyButton;