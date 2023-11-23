// Importar React y el archivo de estilos de la paginación
import React from "react";
import style from "./Pagination.module.css";

// Definir el componente funcional 'Pagination' que recibe las propiedades currentPage, totalPages y onPageChange
function Pagination({ currentPage, totalPages, onPageChange }) {
  // Crear un array de números de página del 1 al total de páginas
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  // Renderizar el componente de paginación
  return (
    <div className={style.container}>
      <div className={style.pages}>
        {/* Mapear a través de los números de página y renderizar un componente para cada uno */}
        {pageNumbers.map((page) => (
          <div
            key={page}
            // Asignar la función onPageChange al hacer clic en una página
            onClick={() => onPageChange(page)}
            // Aplicar clases condicionales para estilos dinámicos basados en el estado de la página actual
            className={`${style["page-number"]} ${currentPage === page ? style.active : ""} ${page % 2 === 0 ? style.alt1 : style.alt}`}
          >
            {page}
          </div>
        ))}
      </div>
    </div>
  );
}

// Exportar el componente Pagination
export default Pagination;
