import React from 'react';
import '../style/components/navbar.css'
import {NavLink} from "react-router-dom";

function Navbar(props){
    return (
        <>
                <div className='NavBar'>
                    <NavLink className="nav-link" to="/">
                        <span className='logo'>KAggarwal</span>
                    </NavLink>
                    <div className='Navbar-items'>
                        <NavLink className="nav-link" to="/projects">
                            <span>Projects</span>
                        </NavLink>
                        <NavLink className="nav-link" to="/blogs">
                            <span>Blogs</span>
                        </NavLink>
                        <NavLink className="nav-link" to="/podcasts">
                            <span>Podcasts</span>
                        </NavLink>
                        <NavLink className="nav-link" to="/skills">
                            <span>Skills</span>
                        </NavLink>
                        <NavLink className="nav-link" to="/about">
                            <span>About</span>
                        </NavLink>
                    </div>
                </div>
        </>
    );
}

export default Navbar;