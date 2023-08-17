import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

function GameInfo(){
    let { id } = useParams();
    const [gameObject, setGameObject] = useState(null);

    useEffect(() => {
        console.log(id);
        axios.get(`http://localhost:6969/game/${id}`).then((response) => {
            console.log(response.data);
            setGameObject(response.data);
        })
    }, [id]);
    // Add "id" to the dependency array 

    return(
        <div className="gameInfoPage">
            <div className="container">
                <div className="game" id="individual">
                    {/* Using a conditional rendering to avoid error when trying to access
                        properties of the gameobject before it gets populated
                    */}
                    {gameObject ? (
                        <div>
                            <div className="name">{gameObject.title}{" "}</div>
                            <div className="body">
                                <img className="gameImage" src={gameObject.background_image_additional} alt="game pic"/>
                                {gameObject.rating}
                                {gameObject.metacritic}
                                {gameObject.description}
                            </div>
                        </div>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GameInfo