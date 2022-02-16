import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import Navbar from "../../Components/NavBar/navbar";
import Delete from '@material-ui/icons/Delete';
import GroupIcon from '@material-ui/icons/Group';
import Lodder from '../../Components/Lodder/lodder';
import { makeApiCall } from "../../Helper/helper";
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './uidList.style.css'
import { Button } from '@material-ui/core';

export default function UidList() {
  const navigate=useNavigate();
  const location = useLocation();
  let data:any=location.state;
  const [uids, setUids] = useState();
    const loggedInUser:any= localStorage.getItem("ccadmin:dashboard:loggedInUser");
    useEffect(() => {
		if ( !uids && localStorage.getItem("ccadmin:dashboard:loggedInUser"))
			makeApiCall("uidList", location.state, {},loggedInUser.region ).then(
				(data:any['']) => {
          
					if (data.data && data.data.length > 0) {
            let d=data.data;
            console.log(d);
            setUids(d.map((item:any,i:number)=>{
              return {count:i+1,...item}
            }));
            
            console.log(uids,"111111111111111111111")
					}
				},
				error => {
					console.log(error);
				}
			);
            
	}, [uids]);

  return (
    <div>
        <div className="uid-container">
      <Navbar />
      <div className="uidlist-container">
      <div className="button"><Button variant="contained" onClick={()=>{navigate(-1)}}>back</Button></div>
        <div className="table-container">
          <div style={{ maxWidth: '100%' }}>
          {uids != null ?
              <MaterialTable
                columns={[
                  { title: 'S_NO', field: 'count' },
                  { title: 'UID', field: 'uid' },
                  { title: 'Device_ID', field: 'deviceId' },
                ]}
                data={uids || []}
                title={"User List For AppID - "+ data.appId}
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
                    tooltip: 'show all devices',
                    onClick: (event, rowData) => {
                      navigate('/uiddevicelist',{state:{...rowData,data}});
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
    </div>
  )
}
