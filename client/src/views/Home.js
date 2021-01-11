import { useEffect, useState } from "react";
import styled from "styled-components";
import SingleGame from "../components/SingleGame";
import axios from "axios";

const Wrapper = styled.main`
margin-top: 100px;
.games{
    display: flex;
    align-items: center;

    flex-direction: column;
}

input{
    width: 200px;
    height: 40px;
    border: 1px solid silver;
    border-radius: 5px;
    padding: 0 10px;
    font-size: 130%;
}
`

export default function Home(){
    const [games, setGames] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:1337/games")
            .then((res) => {
                setGames(res.data);
            })
            .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        const polling = setTimeout(() => {
            axios
            .get(`http://localhost:1337/games?_where[_or][0][Title_contains]=${search}&_where[_or][1][Genre_contains]=${search}`)
            .then((res) => {
                setGames(res.data);
            })
            .catch(err => console.error(err))
        }, 300)

        return () => {
            clearTimeout(polling);
        }
    }, [search])

    const searchChange = (e) => {
        setSearch(e.target.value);
    }

    console.log(games)

    return(
        <Wrapper>
            <h1>Games</h1>
            <div>
                <input type="text" value={search} placeholder="search. . ." onChange={searchChange}/>
            </div>
            <div className="games">
                {games.map((i,id) => {
                    return <SingleGame key={id} data={i} />
                })}
            </div>
        </Wrapper>
    )
}