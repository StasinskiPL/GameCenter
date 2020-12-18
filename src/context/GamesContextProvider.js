import React,{ useContext, useState } from 'react'

const GamesContext = React.createContext()

const GamesContextProvider = ({children}) => {
    const [currentRoom, setCurrentRoom] = useState("")
    return (
        <GamesContext.Provider value={{currentRoom,setCurrentRoom}}>
            {children}
        </GamesContext.Provider>
    )
}

export const useGamesContext =()=> useContext(GamesContext)

export default GamesContextProvider
