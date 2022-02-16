import { useState } from "react";
import './login.style.css';
import { isAuthenticated, makeApiCall, storeToLocal, stringConsts as stringConst } from "../../Helper/helper";
import { useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/logo-inverse.svg';

const Login = () => {
    const navigate = useNavigate();
    const [loggedInUser, updateLoginUser] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [region, setRegion] = useState("");

    function handelLogin(e: any) {
        e.preventDefault();
        makeApiCall("auth", { username, password }, {}, region).then(
            (data: any) => {
                console.log({ data })
                storeToLocal(stringConst.LOCAL_STORAGE.LOGGED_IN_USER, JSON.stringify({ username, password, region, data }));
                // updateLoginUser({ username, password, region, data });
                navigate('applist');
            },
            (error: any) => {
                console.log(error);
            }
        );
    }
    console.log(username, " ", password, " ", region)
    return (
        <div className="main-container">
            <div className="header">
                <div className='logo' onClick={() => { navigate('/home') }}>
                    <img src={logo} alt="BigCo Inc. logo" />
                </div>
            </div>
            <div className="login-box">
                <div className="login-box-field">
                    <p>Login</p>
                </div>
                <div className="login-box-field">
                    <form className="login-form">
                        <label>
                            <p>Username</p>
                            <input type="text" name="name" onChange={e => setUsername(e.target.value)} />
                        </label>
                        <label>
                            <p>Password</p>
                            <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
                        </label>
                        <label>
                            <p>Region</p>
                            <input type="text" name="region" onChange={e => setRegion(e.target.value)} />
                        </label>
                        <input type="submit" value="login" onClick={handelLogin} />
                    </form>
                </div>


            </div>
        </div>
    )
}

export default Login;