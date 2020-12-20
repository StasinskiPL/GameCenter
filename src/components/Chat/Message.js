import React from "react";
import useUserId from "../../hooks/useUserId";

const Message = ({ msg }) => {
  const id = useUserId();
  const { text, authorId, authorNick } = msg;

  return (
    <div className={`message ${authorId === id && "your"}`}>
      <div className="message__center">
        <div className="message-text">
          <p> {text} </p>
        </div>
        {authorId !== id && <p className="message-author">{authorNick}</p>}
      </div>
    </div>
  );
};

export default React.memo(Message);
