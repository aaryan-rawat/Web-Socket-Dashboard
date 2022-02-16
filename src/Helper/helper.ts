import axios from "axios";
// import { Redirect } from "react-router";


// const BASE_URL = "https://websocket-%s.cometchat.io/api/",
const BASE_URL = "http://localhost:8080/api/",
    VERSION = "v1",
    BASE_URL_PARTS = "";

export function makeApiCall(endPointName = "auth", data:any, headers:any, region = "us",...pathParams:any) {
    return new Promise((res, rej) => {
        getEndpointData(endPointName,region,pathParams).then((endPointData:any) => {
            let config:any={};
            config.method = endPointData.method;
            config.url = endPointData.endpoint;
            if (data) {
                if (endPointData.method === "GET") {
                    Object.keys(data).map((key, i) => {
                        if (i === 0)
                            config.url = config.url + "?" + key + "=" + data[key];
                        else {
                            config.url = config.url + "&" + key + "=" + data[key];
                        }
                    })
                } else {
                    config.data = data;
                }

            }
            config.headers = (endPointData.headers ? {
                ...endPointData.headers,
                ...headers
            } : {
                ...headers
            });
            if (endPointData.needAuth) {
                 config.headers.authorization = "Bearer " +getFromLocal(stringConsts.LOCAL_STORAGE.LOGGED_IN_USER).data.bearer;
                

            }
            console.log(config);
            axios(config).then(data => {
                if (data.status == 200) {
                    res(data.data);
                } else {
                    rej(data)
                }
            }).catch(e => {
                rej(e)
            });
        }, error => {
            rej(error)
        });

    })





}
export function getEndpointData(endpointName:string,region:string,pathParam:any) {
    return (new Promise((res, rej) => {
        if (API_DATA.hasOwnProperty(endpointName)) {
            const data = API_DATA[endpointName]();
            data.endpoint = format(BASE_URL,region) + VERSION + BASE_URL_PARTS+ (pathParam?format(data.endpoint,...pathParam):data.endpoint)
            res(data);
        } else {
            rej(ERRORS.SOMETHING_WRONG)
        }
    }));

}
const API_DATA:any = {
    auth: () => {
        return {
            method: "POST",
            endpoint: "/admin/users",
            data: {}
        }
    },
    appList: () => {
        return {
            method: "GET",
            endpoint: "/admin/apps",
            needAuth: true
        }
    },
    guidList:()=>{
        return {
            method: "GET",
            endpoint: "/admin/uidGroup",
            needAuth: true
        }  
    },
    countUser:()=>{
        return {
            method: "GET",
            endpoint: "/admin/activeUsersGroup",
            needAuth: true
        }  
    },
    uidList:()=>{
        return {
            method: "GET",
            endpoint: "/admin/sessions",
            needAuth: true
        }  
    },
    sessionsList: () => {
        return {
            method: "GET",
            endpoint: "/admin/sessions/%s",
            needAuth: true
        }
    },
    deviceList: () => {
        return {
            method: "GET",
            endpoint: "/admin/sessions/users/devicelist",
            needAuth: true
        }
    },
    groupList:()=>{
        return{
            method: "GET",
            endpoint: "/admin/groups",
            needAuth: true
        }
    }
}

export const ERRORS = {
    SOMETHING_WRONG: {
        status: 500,
        message: "SOMETHING IS TERRIBLY WRONG, CONTACT COMETCHAT TEAM",
        code: "SOMETHING IS TERRIBLY WRONG"
    }
}

export function format(stringPattern:string, ...args:any) {
    console.log("formate",stringPattern,args);
    if (stringPattern.split("%s").length > 1)
        return stringPattern.split("%s").reduce((aggregate, chunk, i) => aggregate + chunk + (args[i] || ""), "");
    else return stringPattern
}
export function storeToLocal(key:any, value:any, ns = "ccadmin", partition = "dashboard") {
    key = ns + ":" + partition + ":" + key;
    localStorage.setItem(key, value);
}
export function deleteFromLocal(key:any, ns = "ccadmin", partition = "dashboard") {
    key = ns + ":" + partition + ":" + key;
    localStorage.removeItem(key);
}
export function getFromLocal(key:any, ns = "ccadmin", partition = "dashboard") {
    key = ns + ":" + partition + ":" + key;
    return JSON.parse(localStorage.getItem(key)|| '');
}
export const stringConsts = {
    LOCAL_STORAGE: {
        LOGGED_IN_USER: "loggedInUser"
    }
}
export function isAuthenticated() {
    if (getFromLocal(stringConsts.LOCAL_STORAGE.LOGGED_IN_USER))
        return true;
    else return false;
}