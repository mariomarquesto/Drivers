import { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import style from './Detail.module.css';

const defaultImage = "https://www.donolli.com.ar/defaultImagePI.png";

function Detail() {
  const { id } = useParams();
  const [driver, setDriver] = useState({});
  const URL_BASE = 'https://pi-drivers.onrender.com/drivers/';

  useEffect(() => {
    axios(`${URL_BASE}${id}`)
      .then(({ data }) => {
        if (data.id) {
          const updatedDriver = {
            ...data,
            image: typeof data.image === "object" ? data.image.url : data.image
          };
          setDriver(updatedDriver);
        } else {
          console.error('No hay drivers con ese ID');
        }
      })
      .catch(error => console.error('Error al cargar el detalle del conductor:', error));

    // Cleanup function
    return () => setDriver({});
  }, [id]);
  
  return (
    <div className={style.container}>
      <div>
        <h2 className={style.title}>Drivers detail</h2>
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
                Array.isArray(driver.teams) && driver.teams.length > 0
                  ? ( 
                      <span>
                        {driver.teams.map((team, index) => 
                          (index === driver.teams.length - 1 ? team.name : `${team.name}, `)
                        )}
                      </span>
                    )
                  : <span>No se encontraron escuderías.</span>
              }           
            </div>
            <p><span className={style.negrita}>Id:</span> {driver.id}</p>
          </div>
        </div>
        <div className={style.rightColumn}>
          <img 
            src={driver.image ? driver.image : defaultImage} 
            alt={driver.surname || ''} 
            className={style.circularImage} 
          />
        </div>
      </div>
    </div>
  );
}

export default Detail;
