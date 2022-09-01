import React from "react";
import { useCountdown } from "../hooks/useCountdown";
import { ShowCounter } from "./ShowCounter";
import { ShowHappyBirthday } from "./ShowHappyBirthday";

interface ICountdownTimerProps {
  targetDate: string;
}

export const CountdownTimer: React.FC<ICountdownTimerProps> = ({
  targetDate,
}) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ShowHappyBirthday />;
  } else {
    return (
      <>
        <div style={{fontSize: '20px'}}>Hi Glen! Your birthday is happening in</div>
        <ShowCounter
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      </>
    );
  }
};
