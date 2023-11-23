import React from 'react';
import Card1 from "../card1/card1";

export default function Cards2({ drivers }) {

    return (
        <div >
            {drivers.map((driver) => (
                <Card1 
                    key={driver.id} // clave unica
                    id={driver.id}
                    forename={driver.forename}
                    surname={driver.surname}
                    teams={driver.Teams || driver.teams}
                    image={driver.image.url ? driver.image.url : driver.image}
                    dob={driver.dob}
                />
            ))}
        </div>
    );
}