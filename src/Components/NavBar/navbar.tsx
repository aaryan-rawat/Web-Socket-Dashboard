import React from 'react'
import './navbar.style.css'
import RoomIcon from '@material-ui/icons/ExitToApp';
import logo from '../../Assets/images/logo-inverse.svg';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    let navigate=useNavigate();
    function handleLogout(){
        localStorage.removeItem('ccadmin:dashboard:loggedInUser');
        navigate('/')
    }
  return (<>
      <div className='navbar-blur'></div>
    <div className='navbar'>
        <div className='navbar-first-part'>
            <div className='logo' onClick={()=>{navigate('/')}}>
                <img src={logo} alt="BigCo Inc. logo" />
            </div>
            <div className='nav-links'>
           
            </div>
        </div>
        <div className='navbar-second-part'>
            <div className='logout'>
                <span onClick={handleLogout}>Logout <RoomIcon/></span>
                
            </div>
        </div>
    </div>
    </>
  )
}
