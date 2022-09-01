import React from "react";
import {
  colonDotStyles,
  colonDotsWrapperStyle,
  counterStyle,
  numberCardStyle,
  numberCardsWrapperStyle,
  timeComponentWrapperStyle,
} from "../styles/ShowCounterStyles";

interface IShowCounterProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const ShowCounter: React.FC<IShowCounterProps> = ({
  days,
  hours,
  minutes,
  seconds,
}) => {
  return (
    <div className={counterStyle}>
      <div className={timeComponentWrapperStyle}>
        <span>DAYS</span>
        <div className={numberCardsWrapperStyle}>
          <span className={numberCardStyle}>{getNumberDigit(days, 0)}</span>
          <span className={numberCardStyle}>{getNumberDigit(days, 1)}</span>
        </div>
      </div>
      {makeColon()}
      <div className={timeComponentWrapperStyle}>
        <span>HOURS</span>
        <div className={numberCardsWrapperStyle}>
          <span className={numberCardStyle}>{getNumberDigit(hours, 0)}</span>
          <span className={numberCardStyle}>{getNumberDigit(hours, 1)}</span>
        </div>
      </div>
      {makeColon()}
      <div className={timeComponentWrapperStyle}>
        <span>MINUTES</span>
        <div className={numberCardsWrapperStyle}>
          <span className={numberCardStyle}>{getNumberDigit(minutes, 0)}</span>
          <span className={numberCardStyle}>{getNumberDigit(minutes, 1)}</span>
        </div>
      </div>
      {makeColon()}
      <div className={timeComponentWrapperStyle}>
        <span>SECONDS</span>
        <div className={numberCardsWrapperStyle}>
          <span className={numberCardStyle}>{getNumberDigit(seconds, 0)}</span>
          <span className={numberCardStyle}>{getNumberDigit(seconds, 1)}</span>
        </div>
      </div>
    </div>
  );
};

const makeColon = () => {
  return (
    <span className={colonDotsWrapperStyle}>
      <span className={colonDotStyles}></span>
      <span className={colonDotStyles}></span>
    </span>
  );
};

const getNumberDigit = (num: number, digitFromLeft: number) => {
  let numString = num.toString();
  if (numString.length < 2) {
    numString = "0" + numString;
  }
  return numString.slice(digitFromLeft, digitFromLeft + 1);
};
