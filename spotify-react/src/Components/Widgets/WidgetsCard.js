import React from 'react';
import WidgetEntry from './WidgetEntry';
import { IconContext } from "react-icons";
import { FiChevronRight } from "react-icons/fi";

export default function WidgetCard({ title, similar, featured, newRelease }) {
    console.log(
        "similar", similar, "featured", featured, "newRelease", newRelease);
    
    return (
        <div className="widgetcard-body">
            <p className="widget-title">{title}</p>
            {similar 
                ? simliar.map((artist) => (
                    <WidgetEntry
                        title={artist.name}
                        subtitle={artist.followers.total + " Followers"}
                        image={artist.images[2].url}
                    />
                ))
                : featured
                ? featured.map((playlist) => (
                    <WidgetEntry
                        title={playlist.name}
                        subtitle={playlist.tracks.total + " Songs"}
                        image={playlist.images[0].url}
                    />
                ))
                : newRelease
                ? newRelease.map((album) => (
                    <WidgetEntry
                        title={album.name}
                        subtitle={album.artists[0].name}
                        image={album.images[2].url}
                    />
                ))
                : null}
            <div className="widget-fade">
                <div className="fade-button">
                    <IconContext.Provider value={{ size: "24px", color: "#c4d0e3"}}>
                        <FiChevronRight />
                    </IconContext.Provider>
                </div>
            </div>
        </div>
        );
    }       

    const styles = {
        .widgetcard-body {
            position: relative;
            width: 24%;
            height: 74%;
            border-radius: 30px;
            background: rgb(30, 42, 62);
            background: linear-gradient(
                75deg,
                rgb(40, 58, 88) 0%,
                rgba(54, 69, 98, 0) 100%
            );
            padding: 1% 3%;
            transition: all 0.2s ease-in-out;
            cursor: pointer;
        }
        
        .widgetcard-body:hover {
            transform: scale(1.05);
        }
        
        .widget-title {
            font-size: 18px;
            font-weight: 800;
            color: #c4d0e3;
        }
        
        .widget-fade {
            position:  absolute;
            right: 0;
            bottom: 0;
            width: 84%;
            height: 34%;
            border-radius: 30px;
            background: linear-gradient(
                180deg,
                rgba(54, 69, 98, 0) 10%,
                rgba(54, 69, 98, 1) 100%
            );
            opacity: 0;
            transition: 0.5s ease-in-out;
            animation: none;
            display: flex;
            align-items: flex-end;
            padding: 8%;
        }
        
        .widgetcard-body:hover .widget-fade {
            opacity: 1;
        }
    }