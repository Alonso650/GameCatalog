import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

function GameInfo(){
    let { id } = useParams();
    const [gameObject, setGameObject] = useState(null);

    useEffect(() => {
        console.log(id);
        axios.get(`http://localhost:6969/games/${id}`).then((response) => {
            console.log(response.data);
            setGameObject(response.data);
        })
    });

    return(
        <div className="gameInfoPage">
            <div className="container">
                <div className="game" id="individual">
                    <div className="name">
                        {gameObject.title}{" "}
                    </div>
                    <div className="body">
                        <img className="gameImage" src={gameObject.background_image_additional} alt="game pic"/>
                        {gameObject.rating}{" "}
                        {gameObject.metacritic}{" "}
                        {gameObject.description}{" "}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameInfo