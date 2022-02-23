import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import Navbar from "../../Components/NavBar/navbar";
import Delete from '@material-ui/icons/Delete';
import GroupIcon from '@material-ui/icons/Group';
import Lodder from '../../Components/Lodder/lodder';
import { makeApiCall } from "../../Helper/helper";
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './userCountGroup.style.css'
import { Button } from '@material-ui/core';

export default function UserCountGroup() {
  const navigate=useNavigate();
  const location = useLocation();
  let data:any=location.state;
  let header:any={
      appId:data.data.appId,
      guid:data.guid
  }
  console.log(data,"///////////////uuuuuuuuuuuuuuuuu///////////////////")
  const [countUser, setCountUser] = useState();
    const loggedInUser:any= localStorage.getItem("ccadmin:dashboard:loggedInUser");
    useEffect(() => {
		if ( !countUser && localStorage.getItem("ccadmin:dashboard:loggedInUser"))
			makeApiCall("countUser", header, {},loggedInUser.region ).then(
				(data:any['']) => {
          
					if (data && data.length > 0) {
            let d=data;
            console.log(d);
            setCountUser(d.map((item:any,i:number)=>{
              return {count:i+1,...item}
            }));
            
            console.log(countUser,"111111111111111111111")
					}
				},
				error => {
					console.log(error);
				}
			);
            
	}, [countUser]);

  return (
    <div>
        <div className="count-container">
      <Navbar />
      <div className="usercount-container">
      <div className="button"><Button variant="contained" onClick={()=>{navigate(-1)}}>back</Button></div>
        <div className="table-container">
          <div style={{ maxWidth: '100%' }}>
          {countUser != null ?
              <MaterialTable
                columns={[
                  { title: 'S_NO', field: 'count' },
                  { title: 'User Count', field: 'usercount' }
                ]}
                data={countUser || []}
                title="Active User Count"
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
                
              /> :<Lodder/> }  
          </div> 
      </div>
        </div>
      </div>
    </div>
  )
}
