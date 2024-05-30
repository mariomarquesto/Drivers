import './App.css';
import { useEffect } from 'react';
import { useDispatch} from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import LandingPage from './components/landing/LandingPage';
import Home from "./components/home/Home";
import Detail from './components/detail/Detail';
import Nav from './components/nav/Nav'; // Asegúrate de que esta importación es correcta

import { getDriverByName, getAllDrivers } from './redux/actions/actions';

function App() {

  const { pathname } = useLocation();
  const navigate = useNavigate();
  
  const dispatch = useDispatch();

 

  useEffect(() => {
    dispatch(getAllDrivers());
  }, [dispatch]);

  const onSearch = (name) => {
    dispatch(getDriverByName(name));
  };

  const onHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="App">
      {pathname !== '/' && 
        <Nav  
          onSearch={onSearch}
          onHomeClick={onHomeClick}
          // onFilterChange={(value) => setFilter(value)}
          // onSortChange={(value)=> setSort(value)}
        />
      }
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
