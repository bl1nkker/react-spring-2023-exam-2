import React, { useState, useEffect, useRef } from "react";
import s from "./Clock.module.css";
const Clock = (props) => {
  const [time, setTime] = useState(0);
  const [formattedTime, setFormattedTime] = useState("00:00:01");
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const [opt, setOpt] = useState();

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
        setFormattedTime(formatTime(time));
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    // setTime(0);
    setIsRunning(false);
  };

  const changeTime = (value) => {
    const newTime = parseInt(value) * 86400;
    setTime(newTime);
    setIsRunning(false);
  };

  const formatTime = (timeInSeconds) => {
    const days = Math.floor(timeInSeconds / 86400);
    const hours = Math.floor((timeInSeconds % 86400) / 3600);
    const minutes = Math.floor(((timeInSeconds % 86400) % 3600) / 60);
    const seconds = Math.floor(((timeInSeconds % 86400) % 3600) % 60);
    setTimeFromOpt();
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const clockCycle = (dayTime) => {
    console.log("inClockCycle");
    let hr = parseInt(dayTime.slice(0, 2));
    console.log(props.time);

    let mn = parseInt(dayTime.slice(3, 2));
    let sc = parseInt(dayTime.slice(6, 2));
    if (hr > 0) {
      console.log(hr);
      if (mn == -1) {
        mn = 59;
        hr = hr - 1;
      }
      if (sc == 60) {
        mn = mn - 1;
        sc = 0;
      }
      sc++;
      let time = hr + ":" + mn + ":" + sc;

      props.setTime(time);
      console.log(props.time);
    }
  };

  const setTimeFromOpt = () => {
    console.log("inFromOpt");
    let dayTime;
    switch (opt) {
      case "1 Day":
        dayTime = "23:59:00";
        props.setTime(dayTime);
        break;
      case "2 Day":
        dayTime = "47:59:00";
        props.setTime(dayTime);
        break;
      case "3 Day":
        dayTime = "71:59:00";
        props.setTime(dayTime);
        break;
      case "4 Day":
        dayTime = "95:59:00";
        props.setTime(dayTime);
        break;
      case "5 Day":
        dayTime = "119:59:00";
        props.setTime(dayTime);
        break;
      case "6 Day":
        dayTime = "143:59:00";
        props.setTime(dayTime);
        break;
      case "7 Day":
        dayTime = "168:59:00";
        props.setTime(dayTime);
        break;
    }
    clockCycle("00:00:00");
  };

  return (
    <div className={s.clockComponent}>
      <div className={s.circle}>
        <p>{formatTime(time)}</p>
      </div>
      <select onChange={(e) => changeTime(e.target.value)}>
        <option defaultValue="0" disabled selected>
          Choose Time
        </option>
        <option value="1">1 Day</option>
        <option value="2">2 Day</option>
        <option value="3">3 Day</option>
        <option value="4">4 Day</option>
        <option value="5">5 Day</option>
        <option value="6">6 Day</option>
        <option value="7">7 Day</option>
      </select>
      <button onClick={handleStart}>Go!</button>
      <button onClick={handleReset}>Stop!</button>
    </div>
  );
};

export default Clock;
