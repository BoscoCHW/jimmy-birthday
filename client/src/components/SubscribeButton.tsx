import React from "react";
import { subscribeButtonStyle } from "../styles/CountDownTimerStyles";

interface ISubscribeButtonProps {
  buttonText: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export const SubscribeButton: React.FC<ISubscribeButtonProps> = ({
  buttonText,
  handleClick,
  disabled,
}) => {
  return (
    <button
      className={subscribeButtonStyle}
      onClick={handleClick}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};
