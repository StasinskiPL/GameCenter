import { useState } from "react";

const getNick = () => {
  return sessionStorage.getItem("GamesCenterUserNick") || "";
};

const useUserNick = () => {
  const [nick, setNick] = useState(getNick());

  const setNickHandler = (newNick) => {
    sessionStorage.setItem("GamesCenterUserNick", newNick);
    setNick(newNick);
  };

  return [nick, setNickHandler];
};

export default useUserNick;
