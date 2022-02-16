import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import Navbar from "../../Components/NavBar/navbar";
import Delete from '@material-ui/icons/Delete';
import GroupIcon from '@material-ui/icons/Group';
import Lodder from '../../Components/Lodder/lodder';
import { makeApiCall } from "../../Helper/helper";
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './uidDeviceList.style.css';
import { Button } from '@material-ui/core';

function UidDeviceList() {
  console.log("hiiiiiiiiii")
  let navigate=useNavigate();
  let location=useLocation();
  const [deviceList,setDeviceList] = useState();
  let data:any=location.state;
  console.log(data,"-----------------------------------")
  const loggedInUser: any = localStorage.getItem("ccadmin:dashboard:loggedInUser");
  useEffect(() => {
    if (!deviceList && localStorage.getItem("ccadmin:dashboard:loggedInUser"))
      makeApiCall("deviceList", {uid:data.uid,appId:data.data.appId} , {} , loggedInUser.region).then(
        (data: any['']) => {
          if (data.data && data.data.length > 0) {
            let d=data.data;
            console.log(d);
            setDeviceList(d.map((item:any,i:number)=>{
              return {count:i+1,...item}
            }));

          }
        },
        error => {
      
          console.log(error);
        }
      );

  }, [deviceList]);




  return (
    <div className="device-list-container">
      <Navbar />
      <div className="device-container">
      <div className="button"><Button variant="contained" onClick={()=>{navigate(-1)}}>back</Button></div>
        <div className="table-container">
          <div style={{ maxWidth: '100%' }}>
          {deviceList != null ?
              <MaterialTable
                columns={[
                  { title: 'S_NO', field: 'count' },
                  { title: 'UID', field: 'uid' },
                  { title: 'Device ID', field: 'deviceId' },
                ]}
                data={deviceList || []}
                title={"All Device List For UID - "+data.uid}
                options={
                  {
                    actionsColumnIndex: -1,
                    headerStyle: {
                      backgroundColor: '#01579b',
                      color: '#FFF'
                    },
                    pageSize: 11,
                    pageSizeOptions: [12]
                  }}
                actions={[
                  {
                    icon: GroupIcon,
                    tooltip: 'show group',
                    onClick: (event, rowData) => {
                     
                    }
                  },
                  {
                    icon: Delete,
                    tooltip: 'Delete session',
                    onClick: (event, rowData) => console.log("You want to delete ", rowData)
                  }

                ]}
              /> :<Lodder/> }  
          </div> 
      </div>
        </div>
      </div>
      )
}


export default UidDeviceList;
