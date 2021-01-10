import styled from "styled-components";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
    margin-top: 20px;
    width: 80vw;
    height: 50px;
    border-radius: 5px;
    display:flex;
    justify-content: space-between;
    background-color: rgb(27, 27, 27);
    color: white;
    transition: 0.3s ease-out all;
    :hover{
        background-color: rgb(40, 40, 40);
        width: 82vw;
    }
    .front{
        width: 70%;
        display:flex;
        align-items: center;
    }
    ul{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    li{
        list-style-type: none;
    }
    .back{
        width: 30%;
        display:flex;
        justify-content: flex-end;
        align-items: center;
        margin-right: 10px;
    }
    button{
        width: 80px;
        height: 35px;
        border: none;
        background-color: white;
        border-radius: 5px;
        font-size: 130%;
        margin-left: 10px;
    }

`

export default function SingleGame(props){
    if(!props.data){
        return
    }
    return(
        <Wrapper>
            <div className="front">
                <ul>
                    <li>{props.data.Title}</li>
                    <li>{props.data.Genre.map(game => (game + " "))}</li>
                </ul>
            </div>
            <div className="back">
                <StarRating rating={3} />
                <Link to={"/gamepage/" + props.data.id}>
                    <button>Info</button>
                </Link>
            </div>
        </Wrapper>
    )
}