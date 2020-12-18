import React from 'react'
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
       <nav className="navbar">
           <div className="navbar__center">
                <Link to="/">GameCenter</Link>
           </div>
       </nav>
    )
}

export default Navbar
