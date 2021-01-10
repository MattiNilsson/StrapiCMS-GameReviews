import styled from "styled-components";
import React, {useState} from "react";
import axios from "axios";

const Wrapper = styled.form`
    display:flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 10px solid rgb(34, 51, 98);
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 5px 5px 0 0;
    padding: 20px;
    background-color: rgb(27, 27, 27);
    width: 34vw;
    height: 400px;
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

export default function ReviewForm(props){
    const [reviewData, setReviewData] = useState({
        review : "",
        rating : "",
    })

    const submitReview = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:1337/reviews",  {
                    "Username" : props.user.username,
                    "Review" : reviewData.review,
                    "Rating" : +reviewData.rating,
                    "user" : [+props.user.id],
                    "game" : [+props.game.id],
                },
                {headers : {
                    'Authorization': "Bearer " + localStorage.getItem("jwt")
                }})
            .then((res) => {
                let newGame = {...props.game}
                newGame.reviews.push({
                    "Username" : props.user.username,
                    "Review" : reviewData.review,
                    "Rating" : +reviewData.rating,
                    "user" : [+props.user.id],
                    "game" : [+props.game.id],
                })
                props.setGame(newGame);
            })
            .catch(err => console.error(err))
    }

    const reviewChange = (e) => {
        let newData = {...reviewData};
        newData[e.target.name] = e.target.value;
        setReviewData(newData);
    }

    return(
        <Wrapper onSubmit={submitReview}>
            <h2>make your own review!</h2>
            <label htmlFor="textarea">Review</label>
            <textarea id="textarea" value={reviewData.review} onChange={reviewChange} name="review"></textarea>
            <label htmlFor="rating">Rating</label>
            <input id="rating" type="number" value={reviewData.rating} onChange={reviewChange} name="rating" min="1" max="5"/>
            <button type="submit">submit review</button>
        </Wrapper>
    )
}