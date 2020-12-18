import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./styles/main.scss"
import {BrowserRouter} from "react-router-dom"
import SocketProvider from "./context/SocketProvider"
import GamesContextProvider from "./context/GamesContextProvider"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <GamesContextProvider>
    <SocketProvider>
    <App />
    </SocketProvider>
    </GamesContextProvider>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


