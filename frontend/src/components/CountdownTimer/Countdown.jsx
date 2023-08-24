import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getRemainingTimeUntilMsTimestamp } from "./CountdownTimerUtils";

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

function Countdown({ countdownTimestampMs }) {
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  const updateRemainingTime = (countdown) => {
    setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(countdownTimestampMs);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countdownTimestampMs]);

  return (
    <div>
      <h1 className="text-4xl text-center mb-8">Prepare yourself</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {remainingTime.years > 0 ? (
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-4xl md:text-5xl justify-center">
              <span style={{ "--value": remainingTime.years }} />
            </span>
            <p className="text-center">years</p>
          </div>
        ) : (
          <div className="hidden" />
        )}

        {remainingTime.days > 99 ? (
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdownDays font-mono text-4xl md:text-5xl justify-center">
              <span style={{ "--value": remainingTime.days }} />
            </span>
            <p className="text-center">days</p>
          </div>
        ) : (
          <div className="flex flex-col p-2 bg-neutral rounded-box just text-neutral-content">
            <span className="countdown font-mono text-4xl md:text-5xl justify-center">
              <span style={{ "--value": remainingTime.days }} />
            </span>
            <p className="text-center">days</p>
          </div>
        )}
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-4xl md:text-5xl justify-center">
            <span style={{ "--value": remainingTime.hours }} />
          </span>
          <p className="text-center">hours</p>
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-4xl md:text-5xl justify-center">
            <span style={{ "--value": remainingTime.minutes }} />
          </span>
          <p className="text-center">minutes</p>
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-4xl md:text-5xl justify-center">
            <span style={{ "--value": remainingTime.seconds }} />
          </span>
          <p className="text-center">seconds</p>
        </div>
      </div>
    </div>
  );
}

Countdown.propTypes = {
  countdownTimestampMs: PropTypes.string,
};

Countdown.defaultProps = {
  countdownTimestampMs: 0,
};

export default Countdown;
