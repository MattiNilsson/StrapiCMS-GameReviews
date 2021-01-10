import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import GameDescription from "../components/GameDescription";
import axios from "axios";

import ReviewForm from "../components/ReviewForm";
import SingleReview from "../components/SingleReview";

import { LoginContext } from "../context/LoginContext";

const Wrapper = styled.main`
    display:flex;
    align-items: center;
    flex-direction: column;
    margin-top: 100px;
    .flex{
        display: flex;
        width: 72.5vw;
        justify-content: space-between;
    }
    .holder{
        margin-top: 20px;
    }
`

export default function GamePage(){
    const { id } = useParams();
    const [game, setGame] = useState(false);
    const { user } = useContext(LoginContext);
   
    useEffect(() => {
        axios
            .get("http://localhost:1337/games/" + id)
            .then((res) => {
                setGame(res.data);
            })
            .catch(err => console.error(err))
    }, [id])
    
    if(!game){
        return(<div></div>);
    }
    return(
        <Wrapper>
            <h1>{game.Title}</h1>
            <GameDescription game={game}/>
            <div className="flex">
                <div className="holder">
                    {game.reviews.map((index, id) => {
                        return(
                            <SingleReview game={game} setGame={setGame} i={id} rew={index} key={id} />
                        )
                    })}
                </div>
                {user ? <ReviewForm game={game} setGame={setGame} user={user}/> : ""}
            </div>
        </Wrapper>
    )
}