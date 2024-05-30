import { useState } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes
import style from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {

   const [searchName, setSearchName] = useState("");

   // Manejador de cambios para el campo de búsqueda
   const handleChange = (event) => {
      setSearchName(event.target.value);
   };

   // Función para realizar la búsqueda
   const search = () => {
      // Llama a la función onSearch con el valor de búsqueda actual
      onSearch(searchName);
      // Restablece el estado del campo de búsqueda
      setSearchName("");
   };

   return (
      <div className={style.divSearch}>
         <input 
            type='search' 
            onChange={handleChange}
            value={searchName}
            placeholder="Type a forename to search..."
         />
         <button onClick={search}>Search</button>
      </div>
   );
}

// Define la validación de PropTypes
SearchBar.propTypes = {
   onSearch: PropTypes.func.isRequired, // onSearch debe ser una función y es requerida
};
