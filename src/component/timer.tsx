import React, { useState, useEffect } from "react";
import { VscDebugStart } from "react-icons/vsc";
import { BsStopFill } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";
import {Button} from "react-bootstrap";

export const Timer: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = useState<number>(30 * 60); // 初期値: 30分（秒単位）
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning && timeRemaining > 0) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timeRemaining, isRunning]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${padStart(minutes.toString(), 2, "0")}:${padStart(
      seconds.toString(),
      2,
      "0"
    )}`;
  };

  const handleStartStopClick = (): void => {
    setIsRunning((prevState) => !prevState);
  };

  const handleResetClick = (): void => {
    setIsRunning(false);
    setTimeRemaining(30 * 60);
  };

  return (
    <div className="timer-container">
      <div className="time-display">{formatTime(timeRemaining)}</div>
      <div className="button-container">

        <Button variant="light" onClick={handleStartStopClick}>
          {isRunning ? (
            <BsStopFill className="menu-icon" />
          ) : (
            <VscDebugStart className="menu-icon" />
          )}
        </Button>
        <Button variant="light" onClick={handleResetClick}>
          <GrPowerReset className="menu-icon" />
        </Button>
      </div>
    </div>
  );
};

function padStart(input: string, targetLength: number, padString: string): string {
  if (input.length >= targetLength) {
    return input;
  }

  const paddingLength = targetLength - input.length;
  const repetitions = Math.ceil(paddingLength / padString.length);

  return padString.repeat(repetitions).slice(0, paddingLength) + input;
}
