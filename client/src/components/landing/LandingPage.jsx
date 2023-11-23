import React from 'react';
import { Link } from 'react-router-dom'; 
import style from './LandingPage.module.css';;

function LandingPage() {
  return (
    <div className={style.container}>
    <div className={style.landingPage}>

      {/* Contenido de la página de inicio */}
      <div className={style.content}>

        <h1>Formula 1 Drivers</h1> 
        <p>Click to find out who they are</p>

        {/* Botón para ingresar a la página principal */}
        <Link to="/home" className={style.enterButton}>
          Ingresar
        </Link>
      </div>
    </div>
    </div>
  );
}

export default LandingPage;