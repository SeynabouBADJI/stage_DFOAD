import React, { useState,useRef, useEffect } from 'react';
import { GiStarFormation } from "react-icons/gi";
import ProfileSection from './ProfileSection';
import logo from './images/logo.jpg'; 
import './Sidebar.css';
import { FaBars, FaCommentAlt, FaFileSignature, FaRegChartBar, FaTh, FaUserAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { TbLicense } from "react-icons/tb";
import './styles/Side.css';
import { FcStatistics } from "react-icons/fc";
import { GrDomain } from "react-icons/gr";
import { FaCalendarCheck } from "react-icons/fa";




function Sidebar({children}) {
    const [isOpen,setIsOpen] = useState(false);
    const sidebarRef = useRef(null);
    const contentRef = useRef(null);

    const toggle = () =>setIsOpen(!isOpen);
    const menuItem=[


        {
            path:"/annee",
            name:"AnneeScolaire",
            icon: <FaCalendarCheck />

        },
        {
            path:"/formation",
            name:"Formation",
            icon: <GrDomain />


        },
        {
            path:"/enseignants",
            name:"Enseignant",
            icon: <FaUserAlt/>
        },
        {
            path:"/cours",
            name:"Cours",
            icon: <FaRegChartBar/>
        },
        {
            path:"/contrat",
            name:"Contrat",
            icon: <FaFileSignature />
        },
        {
            path:"/ufr",
            name:"Ufr",
            icon: <GiStarFormation />

        },
        {
            path:"/statics",
            name:"Statistique",
            icon: <FcStatistics />


        },
    ]

    useEffect(() => {
        const sidebarHeight = sidebarRef.current.clientHeight;
        contentRef.current.style.minHeight = `calc(100vh - ${sidebarHeight}px)`;
    }, [isOpen]);

    // const [loggedInUser, setLoggedInUser] = useState('John Doe');

    // const handleLogout = () => {
    //   setLoggedInUser(null);
    // };
  
  return (
    <div className="container" >
        <div  ref={sidebarRef} style ={{ width: isOpen? "200px" : "50px", backgroundColor: "white", boxShadow: isOpen ? "2px 2px 5px rgba(0, 0, 0, 0.2)" : "none" 
 }} className='sidebar'>
            <div className='top_section'>
                <h1 style ={{ display: isOpen? "block" : "none" }}className='logo'><img src={logo} alt="" style={{ width: '60px', height: '60px', borderRadius: '50%', marginRight: '10px' }} /></h1>
                <div style ={{ marginLeft: isOpen? "50px" : "0px" }} className="bars">
                    <FaBars onClick={toggle}/>
                </div>
            </div>
            {
                menuItem.map((item, index) =>(
                    <NavLink to={item.path} key={index} className="link" activeclassname="active">
                        <div className="icon">{item.icon}</div>
                        <div style ={{ display: isOpen? "block" : "none" }}className="link_text">{item.name}</div>
                    </NavLink>
                ))
            }
        </div>
        <main ref={contentRef} className={isOpen ? "main shifted" : "main"}>{children}</main>
        {/* {loggedInUser && <ProfileSection username={loggedInUser} onLogout={handleLogout} />} */}

    </div>
  );
}

export default Sidebar;
