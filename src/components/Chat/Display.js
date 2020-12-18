import React, {useRef, useEffect } from "react";
import Message from "./Message"



const Display = ({messages}) => {
  const messageDisplay = useRef();

  useEffect(()=>{
    console.log(messageDisplay.current);
    messageDisplay.current.scrollTo(0, messageDisplay.current.scrollHeight )
  },[messages])

    return (
        <div className="chat__display">
        <div ref={messageDisplay} className="chat__display-center">
          {messages.map((msg) => (
            <Message key={msg.id} msg={msg} />
          ))}
        </div>
      </div>
    )
}

export default React.memo(Display)
