import React from 'react'

const Message = ({ msg }) => {
    const { text, author } = msg;
    return (
      <div className={`message ${author === "You" && "your"}`}>
        <div className="message__center">
          <div className="message-text">
            <p> {text} </p>
          </div>
        </div>
      </div>
    );
  }

export default React.memo(Message)
