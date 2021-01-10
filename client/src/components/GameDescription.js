import styled from "styled-components";

import StarRating from "./StarRating";

const Wrapper = styled.section`
    .container{
        width: 70vw;
        height: auto;
        background-color: rgb(27, 27, 27);
        padding: 20px;
        text-align: left;
        display:flex;
        align-items: flex-start;
        justify-content: space-between;
        color: white;
        font-size: 120%;
    }

    p{
        width: 40vw;
    }
    .footer{
        width: calc(70vw + 40px);
        height: 50px;
        background-color: rgb(34, 51, 98);
        margin: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .front{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 20px;
        width: 50%;
    }
    .back{
        margin-right: 10px;
    }

    img{
        width: 20vw;
    }

`

export default function GameDescription(props){
    const {Title, Genre, Description, Publisher, Cover, ReleaseDate} = props.game;

    return(
        <Wrapper>
            <div className="container">
                <div className="text">
                    <h1>{Title}</h1>
                    <p>{Description}</p>
                </div>
                <div className="image">
                    <img src={Cover ? 'http://localhost:1337' + Cover[0].url : ""} alt="gameImage"/>
                </div>
            </div>
            <div className="footer">
                <div className="front">
                    <h3>{Publisher}</h3>
                    <h3>{Genre ? Genre.map((gen) => gen + ", ") : ""}</h3>
                    <h3>{ReleaseDate}</h3>
                </div>
                <div className="back">
                    <StarRating rating={3} />
                </div>
            </div>
        </Wrapper>
    )
}