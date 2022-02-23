import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import Navbar from "../../Components/NavBar/navbar";
import Delete from '@material-ui/icons/Delete';
import GroupIcon from '@material-ui/icons/Group';
import Lodder from '../../Components/Lodder/lodder';
import { makeApiCall } from "../../Helper/helper";
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './guidList.style.css'
import { Button } from '@material-ui/core';

export default function GuidList() {
  const navigate=useNavigate();
  const location = useLocation();
  let data:any=location.state;
  const [guid, setGuid] = useState();
    const loggedInUser:any= localStorage.getItem("ccadmin:dashboard:loggedInUser");
    useEffect(() => {
		if ( !guid && localStorage.getItem("ccadmin:dashboard:loggedInUser"))
    console.log(location.state,"0------------------------")
    const {appId}:any=location.state;
			makeApiCall("guidList", {appId}, {},loggedInUser.region ).then(
				(data:any['']) => {
          
					if (data && data.length > 0) {
            let d=data;
            console.log(d);
            setGuid(d.map((item:any,i:number)=>{
              return {count:i+1,...item}
            }));
            
            console.log(guid,"111111111111111111111")
					}
				},
				error => {
					console.log(error);
				}
			);
            
	}, []);

  return (
    <div>
        <div className="guid-container">
      <Navbar />
      <div className="guidlist-container">
      <div className="button"><Button variant="contained" onClick={()=>{navigate(-1)}}>back</Button></div>
        <div className="table-container">
          <div style={{ maxWidth: '100%' }}>
          {guid != null ?
              <MaterialTable
                columns={[
                  { title: 'S_NO', field: 'count' },
                  { title: 'GUID', field: 'guid' }
                ]}
                data={guid || []}
                title={"Active Groups for AppId - "+data.appId}
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
                    tooltip: 'show users count',
                    onClick: (event, rowData) => {
                      navigate('/usercountgroup',{state:{...rowData,data}});
                    } 
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
