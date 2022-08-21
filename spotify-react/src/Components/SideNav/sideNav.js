import React, { useState, useEffect} from 'react';
import { MdFavorite } from 'react-icons/md';
import { FaGripfire, FaPlay } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { IoLibrary } from 'react-icons/io5';
import { MdSpaceDashboard } from 'react-icons/md';
import apiClient from '../../apiClient';
import SideNavButton from './sideNavButton';

export default function SideNav() {
  const [image, setImage] = useState("https://tinyurl.com/yc6fmh8c");
  useEffect(() => {
    apiClient.get("me").then(res => {
       setImage(res.data.images[0].url);
     });
   }, []);
 
  return (
    <div className="sidebar-container">
      <img 
        src={image}
        alt="profile" 
        className="profile-img"
       />
      <div>
        <SideNavButton title="Feed" to="/feed" icon={<MdSpaceDashboard />} />
        <SideNavButton title="Trending" to="/trending" icon={<FaGripfire />} />
        <SideNavButton title="Player" to="/player" icon={<FaPlay />}/>
        <SideNavButton title="Favorites" to="/favorites" icon={<MdFavorite />}/>
        <SideNavButton title="Library" to="/" icon={<IoLibrary />} />
      </div>
      <SideNavButton title="Sign Out" to="" icon={<FaSignOutAlt />}/>
    </div>
  );
}

// const styles = {
//     .sidebar-container{
//         width: 100px;
//         height: 100%;
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         justify-content: space-between;
//       }
      
//       .profile-img{
//         width: 80px;
//         height: 80px;
//         border-radius: 20px;
//         margin-top: 20px;
//         margin-left: 5px;
//       }
// }