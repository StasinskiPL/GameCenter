import React, { useState, useEffect } from "react";
import useUserNick from "../../hooks/useUserNick";
import Backdrop from "../Backdrop";
const SetNick = () => {
 
  const [userInput, setUserInput] = useState("");
  const [nick, setNick] = useUserNick();
  const [showNickModal, setshowNickModal] = useState(true);

  const setNickHandler = (e) => {
    e.preventDefault();
    if (userInput !== "") {
      setNick(userInput);
      // eslint-disable-next-line no-self-assign
      window.location.href=window.location.href;
    }
  };

  useEffect(() => {
    if (!nick || nick.trim() === "") {
      setshowNickModal(true);
    } else {
      setshowNickModal(false);
    }
  }, [nick]);
  if (!showNickModal) {
    return null;
  }

  return (
    <>
      <Backdrop />
      <div className="setNick">
        <div className="setNick__center">
          <header className="setNick__header">
            <h1>Set Nick</h1>
          </header>
          <form className="setNick__form" onSubmit={setNickHandler}>
            <input
              type="text"
              className="setNick__form-input"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button type="submit" className="setNick__form-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SetNick;
