import './App.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import LandingPage from './components/landing/LandingPage';
import Home from "./components/home/Home";
import Detail from './components/detail/Detail';
import CreateDriver from './components/createdriver/CreateDriver';
import Nav from './components/nav/Nav';
import { getDriverByName, getAllDrivers } from './redux/actions/actions'



function App() {

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [searchString, setSearchString] = useState("");

const onSearch = (name) => {
  setSearchString(name);
};

const onHomeClick = () => {
  setSearchString(""); // Limpia el término de búsqueda
  dispatch(getAllDrivers()); // Obtiene todos los conductores nuevamente
};

useEffect(() => {
  if (searchString) {
    dispatch(getDriverByName(searchString));
  }
}, [searchString, dispatch]);


    return (
      <div className='App'>
        
        
        { pathname !=='/' && 
          <Nav  
            onSearch = {onSearch} 
            onHomeClick={onHomeClick}
<<<<<<< HEAD
           // onFilterChange={(value) => setFilter(value)}
=======
            // onFilterChange={(value) => setFilter(value)}
>>>>>>> 730aaec0e62698841c53269d193dd11555caf658
            // onSortChange={(value)=> ScrollRestoration(value)}
            />} 
         <Routes>
            <Route path="/" element={<LandingPage />} /> 
            <Route path="/home" element={<Home  />} /> 
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/create" element={<CreateDriver />} />        
         </Routes>

      </div>

  );


}

export default App
