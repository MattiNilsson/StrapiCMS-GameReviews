import styled from "styled-components";
import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import { LoginContext } from "../context/LoginContext";

const Wrapper = styled.main`
    display: flex;
    justify-content: center;
    margin-top: 100px;
    form{
        display: flex;
        flex-direction: column;
        width: 30vw;
        align-items: center;
        margin-top: 2vw;
        border: 1px solid silver;
        padding: 2vw;
        border-radius: 5px;
    }

    input{
        width: 30vw;
        height: 50px;
        border-radius: 5px;
        font-size: 150%;
        padding-left: 20px;
        border: 1px solid silver;
    }
    label{
        align-self: flex-start;
        font-size: 120%;
        font-weight: bold;
        margin-top: 10px;
    }

    button{
        border: 1px solid darkgray;
        background-color: #fff;
        width: 15vw;
        height: 40px;
        border-radius: 5px;
        font-size: 120%;
        font-weight: bold;
        margin-top: 20px;
        position: relative;
    }
`

export default function Registrer(){
    const {user, setUser} = useContext(LoginContext);
    const [inputData, setData] = useState({
        username : "",
        password : "",
    })

    if(user){
        console.log(user);
        return (<Redirect to="/" />)
    }

    const {username, password} = inputData;

    const onChange = (e) => {
        let newData = {...inputData};
        newData[e.target.name] = e.target.value;
        setData(newData);
    }
    
    const doStuff = (e) => {
        e.preventDefault();

        if(!password || !username) return;
        
        axios
            .post("http://localhost:1337/auth/local", {
                "identifier" : username,
                "password" : password,
            })
            .then(res => {
                localStorage.setItem('jwt', res.data.jwt);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                setUser(res.data.user);
            })
            .catch(err => {
                console.error(err);
            })
    }

    return(
        <Wrapper>
            <form onSubmit={doStuff}>
                <h1>Login</h1>
                <label htmlFor="_username">Username</label>
                <input type="text" id="_username" value={username} name="username"
                    onChange={onChange}
                    autoComplete="username"
                />
                <label htmlFor="_password">password</label>
                <input type="password" id="_password" value={password} name="password"
                    onChange={onChange}
                    autoComplete="password"
                />
                <button type="submit">log in</button>
            </form>
        </Wrapper>
    )
}