import { useState } from 'react';
import style from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {

   const [searchName, setSearchName] = useState("");

  // Manejador de cambios para el campo de búsqueda
   const handleChange = (event) => {
      setSearchName(event.target.value);
   };

<<<<<<< HEAD
   // Función para realizar la búsqueda
   const search = () => {
       // Llama a la función onSearch con el valor de búsqueda actual
      onSearch(searchName);
       // Restablece el estado del campo de búsqueda
=======
   const search = () => {
      onSearch(searchName);
>>>>>>> 730aaec0e62698841c53269d193dd11555caf658
      setSearchName("");
   };

   return (
      <div className = {style.divSearch} >
         <input 
            type='search' 
            onChange={handleChange}
            value={searchName}
            placeholder="Type a forename to search..."/>
         <button onClick={search}>Search</button>

         
      </div>
   );
}
