import React, {useEffect, useState, useRef} from "react";
import styled from "styled-components";
import axios from "axios";

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(25,25,25,0.8);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    .container{
        width: 50vw;
        height: 500px;
        background-color: rgb(15,15,15);
        border-bottom: 10px solid rgb(34, 51, 98);
        border-radius: 5px 5px 0 0;
        position: absolute;
        left: 25vw;
        top: 150px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    textarea{
        min-width: 33vw;
        max-width: 33vw;
        max-height: 150px;
        min-height: 150px;
        margin-bottom: 10px;

    }
    input{
        width: 5vw;
        margin-bottom: 10px;
        font-size: 150%;
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

export default function EditModal(props){
    const [revData, setRevData] = useState({
        review : props.data.Review,
        rating : props.data.Rating,
    })
    const myRef = useRef(null);

    const reviewChange = (e) => {
        let newData = {...revData};
        newData[e.target.name] = e.target.value;
        setRevData(newData);
    }

    useEffect(() => {
        function checkClick(e){
             if(myRef.current && !myRef.current.contains(e.target)){
                 props.close(false);
             }
        }
        document.addEventListener("mousedown", checkClick);

        return () => {
            document.removeEventListener("mousedown", checkClick);
        }

    }, [myRef, props])

    const submitChange = (e) => {
        e.preventDefault();

        let data = {
            "Username" : props.user.username,
            "Review" : revData.review,
            "Rating" : +revData.rating,
            "user" : [+props.user.id],
            "game" : [+props.game.id],
        }

        axios.put("http://localhost:1337/reviews/" + props.data.id, data,
        {headers : {
            'Authorization': "Bearer " + localStorage.getItem("jwt")
        }})
        .then((res) => {
            let newGame = { ...props.game }
            newGame.reviews[props.i] = data
            props.setGame(newGame);
            props.close(false);
        })
        .catch(err => console.error(err))
    }

    return(
        <Wrapper>
            <form onSubmit={submitChange} ref={myRef} className="container">
                <h1>Edit Review</h1>
                <label htmlFor="textarea">Review</label>
                <textarea id="textarea" value={revData.review} onChange={reviewChange} name="review"></textarea>
                <label htmlFor="rating">Rating</label>
                <input id="rating" type="number" value={revData.rating} onChange={reviewChange} name="rating" min="1" max="5"/>
                <button type="submit">Change Review</button>
            </form>
        </Wrapper>
    )
}