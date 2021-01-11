import React, {useEffect, useState} from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 160px;
    height: 35px;
    background-color: rgb(15,15,15);
    border-radius: 5px;
    display:flex;
    justify-content: space-around;
    align-items: center;

    .true{
        width: 20px;
        height: 20px;
        border: 1px solid rgb(25, 76, 218);
        border-radius: 50%;
        background-color:rgb(25, 76, 218);
        box-shadow: 0 0 5px rgb(25, 76, 218);
    }
    .false{
        width: 20px;
        height: 20px;
        border: 1px solid rgb(34, 51, 98);
        border-radius: 50%;
    }
`

export default function StarRating(props){
    const [rating, setRating] = useState([]);
    
    useEffect(() => {
        let arr = [];
    
        for(let i = 0; i < 5; i++){
                if(i < props.rating){
                    arr[i] = true;
                }else{
                    arr[i] = false;
            }
        }

        

        setRating(arr);
        
    }, [props.rating])

    return(
        <Wrapper>
            {rating.map((index, id)=> {
                return(
                    <div key={id + "wtf"}>{index ? <div className="true" ></div> : <div className="false"></div>}</div>
                )
            })}
        </Wrapper>
    )
}