import React from 'react'

const LobbyLink = () => {

    const copyHandler = () => {
        navigator.clipboard.writeText(window.location.href);
      };
    return (
        <div className="lobby__link">
        <div className="lobby__link-box">
          <h1>Invite a friend</h1>
        </div>{" "}
        <p>{window.location.href}</p>{" "}
        <button onClick={copyHandler}>Copy Link</button>
      </div>
    )
}

export default LobbyLink
