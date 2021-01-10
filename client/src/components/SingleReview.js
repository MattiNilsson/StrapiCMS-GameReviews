import React, {useContext, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import StarRating from "./StarRating";
import { LoginContext } from "../context/LoginContext";

import EditModal from "./EditModal";

const Wrapper = styled.section`
    border-bottom: 10px solid rgb(34, 51, 98);
    border-radius: 5px 5px 0 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    text-align: left;
    padding: 0 20px 20px 20px;
    margin-bottom: 10px;
    width: 30vw;
    position: relative;
    background-color: rgb(27, 27, 27);
    .user{
        color: rgb(0, 98, 255);
    }
    .star{
        position: absolute;
        right: 10px;
        top:  10px;
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

export default function SingleReview(props){
    const { user }= useContext(LoginContext);
    const [openModal, setModal] = useState(false);

    const onDelete = (id) => {
        axios
            .delete("http://localhost:1337/reviews/" + id, { headers : { 'Authorization' : "bearer " + localStorage.getItem("jwt")}})
            .then(res => {
                let newGame = { ...props.game };
                console.log(newGame);
                newGame.reviews.splice(props.i, 1)
                props.setGame(newGame);
            })
            .catch(err => console.error(err))
    }

    if(!user){
        return(
            <Wrapper>
                <h3>{props.rew.Username}</h3>
                <p>{props.rew.Review}</p>
                <div className="star">
                    <StarRating rating={props.rew.Rating} />
                </div>
                
            </Wrapper>
        )
    }

    const funcOpenModal = () => {
        setModal(!openModal);
    }

    return(
        <Wrapper>
            {openModal ? <EditModal 
                close={setModal} 
                setGame={props.setGame} 
                i={props.i}
                data={props.rew} 
                user={user} 
                game={props.game}/> : ""}
            <h3 className={user.username === props.rew.Username ? "user" : "lmao"}>{props.rew.Username}</h3>
            <p>{props.rew.Review}</p>
            <div className="star">
                <StarRating rating={props.rew.Rating} />
            </div>
            {user.username === props.rew.Username ? 
                <div>
                    <button onClick={funcOpenModal}>Edit</button>
                    <button onClick={() => onDelete(props.rew.id)}>Delete</button>
                </div>
            : ""}
        </Wrapper>
    )
}