import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { LoginContext } from "../context/LoginContext";

const Wrapper = styled.header`
    width: 100vw;
    height: 75px;
    background-color: rgb(27, 27, 27);
    border-bottom: 10px solid rgb(34, 51, 98);
    display:flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    h1{
        color: white;
        margin-left: 20px;
    }
    .flex{
        margin-right: 20px;
        display: flex;
        align-items: center;
    }
    input{
        width: 200px;
        height: 40px;
        border: none;
        border-radius: 5px;
        padding: 0 10px;
        font-size: 130%;
    }
    .link{
        text-decoration: none;
    }

    button{
        border: none;
        margin-left: 10px;
        background-color: #fff;
        width: 120px;
        height: 30px;
        border-radius: 5px;
        font-size: 120%;
        font-weight: bold;
        position: relative;
    }

    h2{
        margin: 0;
        margin-right: 10px;
        color: white;
    }
    .ball{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color : white;
        margin-right: 10px;
    }
`


export default function Header(){
    const {user, setUser} = useContext(LoginContext);

    const onLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("jwt");
    }

    return(
        <Wrapper>
            <Link to="/" className="link"><h1>GameCritters</h1></Link>
            <div className="flex">
                <h2>{user ? user.username : ""}</h2>
                {user ? <div className="ball"></div> : ""}
                { user ? "" : <Link to="/registrer" className="link"><button>Registrer</button></Link>}
                {
                    user ? <button onClick={onLogout}>logout</button> : 
                    <Link to="/login" className="link"><button>Login</button></Link>
                }
            </div>
        </Wrapper>
    )
}