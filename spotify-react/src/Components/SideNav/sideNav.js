import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
//import { MdSpaceDashboard } from 'react-icons/md';
import { FaSignOutAlt } from "react-icons/fa";
import SideNavButton from "./sideNavButton";
import "./sideNav.css";
import apiClient from "../../apiKit";

export default function SideNav() {
  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdLAY3C19kL0nV2bI_plU3_YFCtra0dpsYkg&usqp=CAU"
  );
  useEffect(() => {
    apiClient.get("me").then((response) => {
      setImage(response.data.images[0].url);
    });
  }, []);

  return (
    <div className="sidebar-container">
      <img src={image} className="profile-img" alt="profile" />
      <div>
        <SideNavButton title="Player" to="/player" icon={<FaPlay />} />
        <SideNavButton title="Library" to="/" icon={<IoLibrary />} />
      </div>
      <SideNavButton title="Sign Out" to="" icon={<FaSignOutAlt />} />
    </div>
  );
}
