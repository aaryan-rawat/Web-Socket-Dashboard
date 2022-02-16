import { kMaxLength } from "buffer";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { makeApiCall } from "../../Helper/helper";
import './appList.style.css'
import Delete from '@material-ui/icons/Delete';
import GroupIcon from '@material-ui/icons/Group';
import Person from '@material-ui/icons/Person';
import Navbar from "../../Components/NavBar/navbar";
import { Button, CircularProgress, Divider } from "@material-ui/core";
import Lodder from '../../Components/Lodder/lodder'
import { useNavigate } from 'react-router-dom';

function AppList() {
  let navigate = useNavigate();
  const [appIds, setAppIds] = useState();
  const loggedInUser: any = localStorage.getItem("ccadmin:dashboard:loggedInUser");
  useEffect(() => {
    if (!appIds && localStorage.getItem("ccadmin:dashboard:loggedInUser"))
      makeApiCall("appList", undefined, {}, loggedInUser.region).then(
        (data: any['']) => {
          if (data && data.length > 0) {
            setAppIds(data.map((item: any, i: number) => {
              return { count: i + 1, ...item }
            }));

          }
        },
        error => {
          console.log(error);
        }
      );

  }, [appIds]);




  return (
    <div className="app-container">
      <Navbar />
      <div className="applist-container">
        <div className="button"></div>
        <div className="table-container">
          <div style={{ maxWidth: '100%' }}>
          {appIds != null ?
              <MaterialTable
                columns={[
                  { title: 'S_NO', field: 'count' },
                  { title: 'APP_ID', field: 'appId' },
                  { title: 'USER COUNTS', field: 'usersCount' },
                ]}
                data={appIds || []}
                title="AppList"
                options={
                  {
                    actionsColumnIndex: -1,
                    headerStyle: {
                      backgroundColor: '#01579b',
                      color: '#FFF'
                    },
                    pageSize: 12,
                    pageSizeOptions: [12]
                  }}
                actions={[
                  {
                    icon: Person,
                    tooltip: 'Show Active Users',
                    onClick: (event, rowData) => {
                      navigate('/uidlist',{state:{...rowData}});
                     
                    }
                  },
                  {
                    icon: GroupIcon,
                    tooltip: 'Show Groups',
                    onClick: (event, rowData) => {
                      
                      navigate('/guidlist',{state:{...rowData}});
                     
                    }
                  }

                ]}
              /> :<Lodder/> }  
          </div> 
      </div>
        </div>
      </div>
      )
}


export default AppList;