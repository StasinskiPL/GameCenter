import React from 'react'


// css in _uIUtilities.scss

const Setting = ({name, btn}) => {
    return (
        <div className="setting">
            <div className="setting__center">
                <h1>{name}</h1>
                <span>{btn}</span>
            </div>
        </div>
    )
}

export default Setting
