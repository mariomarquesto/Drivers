import axios from 'axios';
import { GET_ALL_DRIVERS, 
         GET_DRIVER_BY_NAME, 
         GET_TEAMS,
         SET_CURRENT_PAGE,
         FILTER_DRIVERS,
         ORDER_DRIVERS,

  } from './action_types';

const URL_BASE = 'https://pi-drivers.onrender.com/drivers'

export const getAllDrivers =  () => {
    return async function(dispatch){
        const response = await axios(`${URL_BASE}`);
        return dispatch({
            type: GET_ALL_DRIVERS,
            payload: response.data
        })
    }
}

export function getDriverByName(name){
    return async function(dispatch){
        const response = await axios(`${URL_BASE}/?name=${name}`);
        return dispatch({
            type: GET_DRIVER_BY_NAME,
            payload: response.data
        })
    }
}

export const getTeams = () => {
    return async (dispatch) => {
      const { data } = await axios.get("https://pi-drivers.onrender.com/teams");
      dispatch({
        type: GET_TEAMS,
        payload: data,
      });
    };
  };


  export const createDrivers = (driver) => {
    return async (dispatch) => {
      const { data } = await axios.post(
        "https://pi-drivers.onrender.com/drivers",
        driver
      );
      return {
        type: POST_DRIVERS,
        payload: data,
      };
    };
  };

  export const setCurrentPage = (page) => {
    return {
      type: SET_CURRENT_PAGE,
      payload: page,
    };
  };


  export const filterDrivers = (team, source, order) => {
    return {
      type: FILTER_DRIVERS,
      payload: { team, source, order },
    };
  };


  export const orderDrivers = (order) => {
    return {
      type: ORDER_DRIVERS,
      payload: order,
    };
  };


