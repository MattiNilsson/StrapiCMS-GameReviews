import styled from "styled-components";
import React, {useState} from "react";
import {Redirect} from "react-router-dom"
import axios from "axios";

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
    const [dummy, setDummy] = useState(false);
    const [inputData, setData] = useState({
        username : "",
        email : "",
        password : "",
        re_password : ""
    })

    if(dummy){
        return <Redirect to="/login" />
    }

    const {username, email, password, re_password} = inputData;

    const onChange = (e) => {
        let newData = {...inputData};
        newData[e.target.name] = e.target.value;
        setData(newData);
    }

    const doStuff = (e) => {
        e.preventDefault();
        if(password.length < 8) return;
        if(password !== re_password) return;

        axios
            .post("http://localhost:1337/users", {
                "username" : username,
                "email" : email,
                "password" : password,
                "confirmed" : true
            })
            .then(res => {
                console.log(res);
                setDummy(true);
            })
            .catch(err => {
                console.error(err);
            })
    }

    return(
        <Wrapper>
            <form onSubmit={doStuff}>
                <h1>Register</h1>
                <label htmlFor="_username">Username</label>
                <input type="text" id="_username" value={username} name="username"
                    onChange={onChange}
                    autoComplete="username"
                />
                <label htmlFor="_email">Email</label>
                <input type="email" id="_email" value={email} name="email"
                    onChange={onChange}
                />
                <label htmlFor="_pass">Password</label>
                <input type="password" id="_pass" value={password} name="password"
                    onChange={onChange}
                    autoComplete="new-password"
                />
                <label htmlFor="_repass">Re-password</label>
                <input type="password" id="_repass" value={re_password} name="re_password"
                    onChange={onChange}
                    autoComplete="new-password"
                />
                <button type="submit">sign up!</button>
            </form>
        </Wrapper>
    )
}