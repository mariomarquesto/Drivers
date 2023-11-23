import React from 'react';
import style from './Card.module.css';
import { Link } from 'react-router-dom';

<<<<<<< HEAD
const defaultImage = "https://images.pexels.com/photos/163444/sport-treadmill-tor-route-163444.jpeg"

function Card(props) {
    
    const { id, image, forename, surname, teams, dob, nationality } = props;
=======
const defaultImage = "https://www.donolli.com.ar/defaultImagePI.png"

function Card(props) {
    
    const { id, image, forename, surname, teams, dob } = props;
>>>>>>> 730aaec0e62698841c53269d193dd11555caf658

 
    return (
      <div className={style.container}>

        <img src={image || defaultImage} alt={`${forename} ${surname}`} className={style.image} />

        <Link to={`/detail/${id}`}>
          
          <h3 className={style.name}>{forename} {surname}</h3>
          {/* <h2>{id}</h2>  */}
        </Link>
        <div>Dob {dob}</div>
<<<<<<< HEAD
        <h4>Nationality: {nationality}</h4>
=======
>>>>>>> 730aaec0e62698841c53269d193dd11555caf658
        <h4>Teams: </h4>
        {typeof teams === 'string' 
          ? (<p className={style.overflowVisible}>{teams}</p>) 
          : Array.isArray(teams) && teams.length > 0 
            ? (
              <p className={style.overflowVisible} >
              {teams.map((team, index) => (
                index === teams.length - 1 ? team.name : `${team.name}, `
              ))}
            </p>
              ) 
            : (
                <p>Teams were not found.</p>
              )}
              
      </div>
    )
  }
  
  export default Card;