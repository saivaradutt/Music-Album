import React from 'react';
import '../index.css';
import {BrowserRouter, Link} from "react-router-dom";                                           //installed library to make the routing easy

const Menu = () => {

    return(
        <div>
            <main>
                <nav className="navbar fixed-top navbar-light bg-light">
                    <Link className="navbar-brand" to="/">D-Music</Link>                        {/*Link is navigational Component to make links*/}
                    <Link className="navbar-brand custom-menu-item" to="Search">Search new Tracks </Link>
                    <Link className="navbar-brand custom-menu-item" to="Track">See selected tracks</Link>
                </nav>
            </main>
        </div>
    )
};

export default Menu;