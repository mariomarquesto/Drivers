<<<<<<< HEAD
// Importar las dependencias y componentes necesarios
=======
>>>>>>> 730aaec0e62698841c53269d193dd11555caf658
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDrivers, setCurrentPage } from "../../redux/actions/actions";
import Cards from "../cards/Cards";
import Pagination from "../pagination/Pagination"; 
import FilterOrder from "../filterorder/FilterOrder";
import style from "./Home.module.css";

<<<<<<< HEAD
// Definir el componente funcional principal 'Home'
function Home() {
  // Inicializar ganchos de Redux para acceder y despachar acciones
  const dispatch = useDispatch();
  // Utiliza el hook 'useSelector' de React-Redux para seleccionar la porción de estado 'allDrivers' desde Redux y asignarlo a la variable local 'allDrivers'
 const allDrivers = useSelector((state) => state.allDrivers);
  const currentPage = useSelector((state) => state.currentPage);
  const currentOrder = useSelector((state) => state.currentOrder);

  // Definir la cantidad de conductores a mostrar por página
  const driversPerPage = 9; 

  // Utilizar useEffect para despachar una acción para obtener todos los conductores cuando el componente se monta
  useEffect(() => {
    // Verificar si ya se han cargado los conductores para evitar solicitudes duplicadas
    if (allDrivers.length === 0) {
      dispatch(getAllDrivers());
    }
  }, [dispatch, allDrivers.length]);

  // Calcular el rango de índices para los conductores en la página actual
  //índice del último conductor
  const indexOfLastDriver = currentPage * driversPerPage;
  //índice del primer conductor
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  //controladores actuales
  const currentDrivers = allDrivers.slice(indexOfFirstDriver, indexOfLastDriver);

  // Definir funciones para manejar la paginación
  const paginate = (pageNumber) => {
    // Despachar una acción para actualizar la página actual
    dispatch(setCurrentPage(pageNumber));
  };

  // Calcular el rango de índices para los conductores en la página actual (para otra parte del código)
=======

function Home() {
  const dispatch = useDispatch();
  const allDrivers = useSelector((state) => state.allDrivers);
  const currentPage = useSelector((state) => state.currentPage);
  const currentOrder = useSelector((state) => state.currentOrder);
 

  const driversPerPage = 9; 

  useEffect(() => {
    if (allDrivers.length === 0) {
      dispatch(getAllDrivers());
      
    }
  }, [dispatch, allDrivers.length]);
  
  
 
  // Calcular el índice de inicio y fin para los conductores de la página actual
 
  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = allDrivers.slice(indexOfFirstDriver, indexOfLastDriver);
  
 

  // Cambiar de página
  const paginate = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

>>>>>>> 730aaec0e62698841c53269d193dd11555caf658
  const startPage = (currentPage - 1) * driversPerPage;
  const endPage = startPage + driversPerPage;
  const currentDriversForPagination = allDrivers.slice(startPage, endPage);

<<<<<<< HEAD
  // Definir funciones para navegar a las páginas anterior y siguiente
  const PreviousPage = () => {
    // Verificar si la página actual es mayor que 1 antes de retroceder
=======
  const PreviousPage = () => {
>>>>>>> 730aaec0e62698841c53269d193dd11555caf658
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const NextPage = () => {
<<<<<<< HEAD
    // Calcular el número total de páginas
    const totalPages = Math.ceil(allDrivers.length / driversPerPage);
    // Verificar si la página actual es menor que el total de páginas antes de avanzar
=======
    const totalPages = Math.ceil(allDrivers.length / driversPerPage);
>>>>>>> 730aaec0e62698841c53269d193dd11555caf658
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

<<<<<<< HEAD
  // Renderizar el componente
  return (
    <div className={style.container}>
      {/* Mostrar el componente de filtro de orden */}
      <div className={style.OrderFilter}>
        <FilterOrder currentOrder={currentOrder} />
      </div>
      
      {/* Mostrar botones de anterior y siguiente para la paginación */}
      <div className={style.botones}>
        <button onClick={PreviousPage} disabled={currentPage === 1}>
          Anterior
=======


  return (
    <div className={style.container}>
      <div className={style.OrderFilter}>
            <FilterOrder currentOrder={currentOrder} />
      </div>
      {/* Botones ANTERIOR y SIGUIENTE Paginación BOTTOM */}
      <div className={style.botones}>
        <button onClick={PreviousPage} disabled={currentPage === 1}>
          Previous
>>>>>>> 730aaec0e62698841c53269d193dd11555caf658
        </button>

        <div className={style.pageNum}>{currentPage}</div>

        <button onClick={NextPage} disabled={endPage >= allDrivers.length}>
<<<<<<< HEAD
          Siguiente
        </button>
      </div>

      {/* Mostrar un mensaje o las tarjetas según la presencia de conductores */}
      {typeof allDrivers[0] === "object" && "message" in allDrivers[0] 
        ? (
          <p className={style.mensajeCentral}>{allDrivers[0].message}</p>
        ) 
        : (
          <Cards drivers={currentDrivers} />
        )
      }

      {/* Mostrar el componente de paginación */}
=======
          Next
        </button>
      </div>

      {/* Mostrar mis Cards */}
      
      {typeof allDrivers[0] === "object" && "message" in allDrivers[0] 
          ? (
            <p className={style.mensajeCentral}>{allDrivers[0].message}</p>
            ) 
          : (
            <Cards drivers={currentDrivers} />
            )
      }
>>>>>>> 730aaec0e62698841c53269d193dd11555caf658
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(allDrivers.length / driversPerPage)}
        onPageChange={paginate}
      />
<<<<<<< HEAD
=======
  
>>>>>>> 730aaec0e62698841c53269d193dd11555caf658
    </div>
  );
}

<<<<<<< HEAD
// Exportar el componente Home
=======
>>>>>>> 730aaec0e62698841c53269d193dd11555caf658
export default Home;
