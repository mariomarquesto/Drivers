import React from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import style from './Detail.module.css';
<<<<<<< HEAD
const defaultImage = "https://images.pexels.com/photos/163444/sport-treadmill-tor-route-163444.jpeg"
=======
const defaultImage = "https://www.donolli.com.ar/defaultImagePI.png"
>>>>>>> 730aaec0e62698841c53269d193dd11555caf658

function Detail() {
  const { id } = useParams()  //este id se lo manda Card por props
  const [ driver, setDriver ]= useState({})
<<<<<<< HEAD
  const URL_BASE = 'http://localhost:3001/drivers/' //a esta url del back end llamaremos
=======
  const URL_BASE = 'https://pi-drivers.onrender.com/drivers/' //a esta url del back end llamaremos
>>>>>>> 730aaec0e62698841c53269d193dd11555caf658


  useEffect(() => {
   let copiaDatos = {}
   axios(`${URL_BASE}${id}`).then(({ data }) => {
      if (data.id) {
         setDriver(data);
         if (typeof data.id !== "string"){
          copiaDatos = {
            ...data,
            image: data.image.url
          }
         } else {
          copiaDatos = {
            ...data,
            image: data.image
          }
         }
         setDriver(copiaDatos)
      } else {
         window.alert('No hay drivers con ese ID');
      }
   });

   return setDriver({});
}, [id]);
  
  return (
    <div className={style.container}>
      <div>
        <h2 className={style.title}>Driver's detail</h2>
      </div>
      
      <div className={style.detail}>
        <div className={style.leftColumn}>
          
          <h1 className={style.specialFont}>
            <span>{driver.name ? driver.name.forename : driver.forename}</span> 
            <span>{driver.name ? driver.name.surname : driver.surname}</span>
            </h1>      
            <div className={style.infoDriver}>
            <p><span className={style.negrita}>Nationality: </span>{driver.nationality}</p>
            <p><span className={style.negrita}>Date of Birth: </span>{driver.dob}</p> 
            <p><span className={style.negrita}>Description: </span>{driver.description}</p>  

            <div><span className={style.negrita}>Teams:</span>
              { 
                typeof driver.teams === 'string'
                  ? (<span >{driver.teams}</span>)
                  : Array.isArray(driver.Teams) && driver.Teams.length > 0
                       ? ( <span >{driver.Teams.map((team, index) => (index === driver.Teams.length - 1 ? team.name : `${team.name}, `))}</span>) 
                  : (<span>No se encontraron escuderías.</span> )
              }           
            </div>
          
          <p><span className={style.negrita}>Id:</span> {driver.id}</p></div>


        </div>
        <div className={style.rightColumn}>
          {console.log("image abajo", driver)}

              <img 
                src={driver.image ? driver.image : defaultImage} 
                alt={driver.surname} 
                className={style.circularImage} />
        </div>

      </div>
    </div>
  )
}

export default Detail;