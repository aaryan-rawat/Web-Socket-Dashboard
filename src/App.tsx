import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login/login';
import AppList from './Pages/AppList/appList';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UidList from './Pages/UiddList/uidList';
import UidDeviceList from './Pages/UidDeviceList/uidDeviceList';
import GuidList from './Pages/GuidList/guidList';
import UserCountGroup from './Pages/UserCountGroup/userCountGroup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="applist" element={<AppList />} />
        <Route path="uidlist" element={<UidList/>}/>
        <Route path="uiddevicelist" element={<UidDeviceList/>}/>
        <Route path="guidlist" element={<GuidList/>}/>
        <Route path="usercountgroup" element={<UserCountGroup/>}/>
      </Routes>
    </BrowserRouter>

  );
}

{/* <div className="App">
{localStorage.getItem("ccadmin:dashboard:loggedInUser")?<GroupList/>:<Login/>}

</div> */}

export default App;
