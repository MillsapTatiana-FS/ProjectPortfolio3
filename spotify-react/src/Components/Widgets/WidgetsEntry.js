import React from 'react'

export default function WidgetsEntry({ title, subtitle, image }) {
  return (
    <div className="entry-body flex">
        <img src={image} alt={title} className="entry-image" />
        <div className="entry-right-body flex">
            <p className="entry-title">{title}</p>
            <p className="entry-subtitle">{subtitle}</p>
        </div>
    </div>
  );
}

const styles = {
    .entry-body{
        width: 100%;
        align-items: center;
        margin-top: 10%;
    }
    
    .entry-image {
        height: 50px;
        width: 50px;
        border-radius: 15px;
        margin-right: 10px;
    }
    
    .entry-right-body {
        flex-direction: column;
        justify-content: center;
    }
    
    .entry-title {
        font-weight: 700;
        font-size: 16px;
        color: #c9d0e3;
        margin: 0px 0px 5px;
    }
    
    .entry-subtitle{
        font-weight: 400;
        font-size: 12px;
        color: #c4d0e37c;
        margin: 0;
    }
}