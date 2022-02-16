import React from "react";
import { useState } from "react";
import './login.style.css';
import LoginImage from "../../Assets/images/loginImage.png"
import { isAuthenticated, makeApiCall, storeToLocal, stringConsts as stringConst } from "../../Helper/helper";
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const [ loggedInUser, updateLoginUser ] = useState("");
    const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [region, setRegion] = useState("");
    
    function handelLogin(e:any){
        e.preventDefault();		
		makeApiCall("auth", { username, password }, {}, region).then(
			(data:any) => {
				console.log({data})
				storeToLocal(stringConst.LOCAL_STORAGE.LOGGED_IN_USER, JSON.stringify({ username, password, region, data }));
				// updateLoginUser({ username, password, region, data });
                navigate('applist');
			},
			(error:any) => {
				console.log(error);
			}
		);
	}
    console.log(username," ",password," ",region)
    return (
        <div className="main-container">
            <div className="form-box">
                <div className="partition">
                    {/* <img src={LoginImage} alt="logo" /> */}
                    <h1>LOGIN TO COMETCHAT DASHBOARD</h1>
                </div>
                <div className="partition">
                    <div className="login-box">
                        <div className="login-box-field">
                            <p>Login</p>
                        </div>
                        <div className="login-box-field">
                            <form className="login-form">
                                <label>
                                    <p>Username</p>
                                    <input type="text" name="name" onChange={e=>setUsername(e.target.value)}/>
                                </label>
                                <label>
                                    <p>Password</p>
                                    <input type="password" name="password" onChange={e=>setPassword(e.target.value)} />
                                </label>
                                <label>
                                    <p>Region</p>
                                    <input type="text" name="region" onChange={e=>setRegion(e.target.value)} />
                                </label>
                                <input type="submit" value="login" onClick={handelLogin}/>
                            </form>
                        </div>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login;