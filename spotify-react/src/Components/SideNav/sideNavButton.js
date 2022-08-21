import React from 'react';
import { IconContext } from 'react-icons';
import { Link, useLocation } from 'react-router-dom';

export default function SideNavButton(props) {
    const location = useLocation();

    const isActive = location.pathname === props.to;

    const btnClass = isActive ? "btn-body active" : "btn-body";
  return (
    <Link to={props.to}>
        <div className={btnClass}>
            <IconContext.Provider value={{ size: "24px", className: "btn-icon" }}>
            {props.icon}
            <p className="btn-title">{props.title}</p>
            </IconContext.Provider>
        </div>
    </Link>
  );
}

const styles = {
    a {
        text-decoration: none !important;
    }
    
    .btn-body{
        height: 80px;
        width: 80px;
        border-radius: 20px;
        color: #f44afd;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin: 5px auto;
        transition: all 0.2s ease;
        background-color: rgba(239, 146, 244, 0);
    }
    
    .btn-body.active{
        background-color: rgb(244, 146, 233);
        color: #fff;
        transform: scale(1.05);
    }
    
    .btn-body:hover{
        color: rgb(247, 172, 234);
    }
    
    .btn-title{
        margin: 4px auto;
        font-weight: 600;
        font-size: 14px;
    }
}