import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card1.module.css';

const defaultImage = "https://images.pexels.com/photos/163444/sport-treadmill-tor-route-163444.jpeg"

const Card1 = (props) => {
    const { id, image, forename, surname, teams, dob } = props;

    return (
        <Link className={styles.navlink} to={`/detail/${id}`}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <img
                        className={styles.cardImg}
                        src={image || defaultImage}
                        alt={`${forename} ${surname}`}
                    />
                    <h2 className={styles.cardName}>{forename} {surname}</h2>
                    <div className={styles.cardDob}>Dob {dob}</div>
                    <h3 className={styles.cardTeams}>Teams: </h3>
                    {typeof teams === 'string'
                        ? (<p className={styles.overflowVisible}>{teams}</p>)
                        : Array.isArray(teams) && teams.length > 0
                            ? (
                                <p className={styles.overflowVisible}>
                                    {teams.map((team, index) => (
                                        index === teams.length - 1 ? team.name : `${team.name}, `
                                    ))}
                                </p>
                            )
                            : (
                                <p>Teams were not found.</p>
                            )}
                </div>
            </div>
        </Link>
    );
};

export default Card1;
