import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify"
import axios from "axios";

function GameInfo(){
    let { id } = useParams();
    const [gameObject, setGameObject] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        console.log(id);
        axios.get(`http://localhost:6969/game/${id}`).then((response) => {
            console.log(response.data);
            setGameObject(response.data);
        })
    }, [id]);
    // Add "id" to the dependency array 

    return(
        <div className="container">
            <div className="individual">
                {/* Using a conditional rendering to avoid error when trying to access
                    properties of the gameobject before it gets populated
                */}
                {gameObject ? (
                    <div className="gameInfo">
                        <div className="name">{gameObject.title}</div>
                        {/* <div className="body"> */}
                            <img className="gameImage" src={gameObject.background_image_additional} alt="game pic"/>
                            {/* <div> */}
                                <h3>Title: {gameObject.name}</h3>
                                <h3>MetaCritic Score: {gameObject.metacritic}</h3>
                            {/* </div> */}
                            {/* <div> */}
                                Game Description: 
                                {/* This library and line of code will remove the HTML tags from the description */}
                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(gameObject.description)}} />
                            {/* </div> */}
                        {/* </div> */}
                    </div>
                    ) : (
                        <div>Loading...</div>
                    )}
                    <div>
                        <button onClick={() => {
                            navigate('/');
                        }}>
                            Back
                        </button>
                    </div>
            </div>
        </div>
    );
}

export default GameInfo