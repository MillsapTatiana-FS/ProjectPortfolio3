import React, { useState, useEffect} from 'react';
import { MdFavorite } from 'react-icons/md';
import { FaGripfire, FaPlay } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { IoLibrary } from 'react-icons/io5';
import { MdSpaceDashboard } from 'react-icons/md';
import SideNavButton from './sideNavButton';
import './sideNav.css';

export default function Sidebar() {
  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdLAY3C19kL0nV2bI_plU3_YFCtra0dpsYkg&usqp=CAU"
  );
  
  return (
    <div className="sidebar-container">
      <img src={image} className="profile-img" alt="profile" />
      <div>
        <SideNavButton title="Feed" to="/feed" icon={<MdSpaceDashboard />} />
        <SideNavButton title="Trending" to="/trending" icon={<FaGripfire />} />
        <SideNavButton title="Player" to="/player" icon={<FaPlay />} />
        <SideNavButton
          title="Favorites"
          to="/favorites"
          icon={<MdFavorite />}
        />
        <SideNavButton title="Library" to="/" icon={<IoLibrary />} />
      </div>
      <SideNavButton title="Sign Out" to="" icon={<FaSignOutAlt />} />
    </div>
  );
}