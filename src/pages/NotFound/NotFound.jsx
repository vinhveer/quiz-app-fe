import React, { useEffect } from 'react';
import './NotFound.css'; 
import astronaut from '../../assets/not-found/astronaut.svg';
import planet from '../../assets/not-found/planet.svg';

const NotFound = () => {
    return (
        <div className="permission_denied">
            <div id="tsparticles"></div>
            <div className="denied__wrapper">
                <h1>404</h1>
                <h3>
                    LOST IN <span>SPACE</span> App-Name? Hmm, looks like that page doesn't exist.
                </h3>
                <a href="/">
                    <button className="denied__link">Go Home</button>
                </a>
                <img id="astronaut" src={astronaut} alt="Astronaut" />
                <img id="planet" src={planet} alt="Planet" />
            </div>
        </div>
    );
};

export default NotFound;
