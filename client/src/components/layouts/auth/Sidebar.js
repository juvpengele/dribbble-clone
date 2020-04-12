import React from "react";
import LogoSvg from "./LogoSvg";
import { Link } from "react-router-dom";

function Sidebar(props){

    const _getClassName = ()  => {
        return "sidebar--" + window.location.pathname.replace("/", "");
    };


    return (
        <div className={`sidebar ${_getClassName()}`}>
            <div className="sidebar__container">
                <Link to="/">
                    <LogoSvg/>
                </Link>
                <h1 className="sidebar__title">
                    <span>
                        Discover the world’s top
                    </span>
                    <span>
                        Designers & Creatives.
                    </span>
                </h1>
            </div>
        </div>
    )
}

export default Sidebar