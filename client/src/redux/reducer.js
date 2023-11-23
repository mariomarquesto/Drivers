import { GET_ALL_DRIVERS, 
         GET_DRIVER_BY_NAME,  
         GET_TEAMS,
         SET_CURRENT_PAGE,
         FILTER_DRIVERS,
        ORDER_DRIVERS,
         } from './actions/action_types';

let initialState = { 
    allDrivers:[], 
    driversCopy:[], 
    driversOrigin:[],
    teams: [],
    currentPage: 1,
    // currentOrder: "Orderless",
};

function reducer(state = initialState, action){
    switch(action.type){
        
        case GET_ALL_DRIVERS:
            return {
                ...state,
                allDrivers: action.payload,
                driversCopy: action.payload,
            }
        case GET_DRIVER_BY_NAME:
           
            if (action.payload.length === 0) {
                // Si la respuesta está vacía, no se encontraron resultados
                return {
                  ...state,
                  allDrivers: [{ message: "No Drivers found with that name" }],
                  currentPage: 1,
                };
              } else {
                // Si la respuesta contiene datos, se encontraron resultados
                return {
                  ...state,
                  allDrivers: action.payload,
                  currentPage: 1,
                };
              }
  
        case GET_TEAMS:
            return {
                ...state,
                teams: action.payload,
            };     
                          
        case FILTER_DRIVERS:
            const { team, source, order } = action.payload;
            console.log("team selection: ", team)
            console.log("source selection: ", source)
            console.log("order selection: ", order)



            // Filtrado por source
            let filteredDrivers = state.driversCopy;


            if (order === "Ascending") {
                console.log("deberia ordenar por nombre ascendente: ", order)
                filteredDrivers.sort((a, b) => a.forename.localeCompare(b.forename));
            } else if (order === "Descending") {
                console.log("deberia ordenar por nombre descendente: ", order)
                filteredDrivers.sort((a, b) => b.forename.localeCompare(a.forename));
            } else if (order === "Fecha Asc") {
                console.log("deberia ordenar por birthday ascendente: ", order)
                filteredDrivers.sort((a, b) => new Date(a.dob) - new Date(b.dob));
            } else if (order === "Fecha Desc") {
                console.log("deberia ordenar por birthday descendente: ", order)
                filteredDrivers.sort((a, b) => new Date(b.dob) - new Date(a.dob));
            }

            if (source === "Api") {
                filteredDrivers = filteredDrivers.filter((driver) => typeof driver.id === "number");
            } else if (source === "BD") {
                filteredDrivers = filteredDrivers.filter((driver) => typeof driver.id === "string");
            }
            
            // Filtrado por team
            if (team !== "All Teams") {
                filteredDrivers = filteredDrivers.filter((driver) => {
                    if (typeof driver.id === "number") {
                        // Si el "id" es un número, es un registro de la API
                        return driver.teams && driver.teams.includes(team);
                    } else if (typeof driver.id === "string") {
                        // Si el "id" es una cadena, es un registro de la BD
                        return driver.Teams && driver.Teams.some((teamObj) => teamObj.name === team);
                    }
                    return false;
                    });                }

            // Ordenar
 
            console.log("filteredDrivers: ", filteredDrivers)                
            
            // Verificar si no se encontraron conductores
            if (filteredDrivers.length === 0) {
                return {
                ...state,
                selectedSource: source,
                selectedTeam: team,
                allDrivers: [{ message: "No se encontraron conductores para su selección" }],
                currentPage: 1,
                };
            }
            
            // Si se encontraron conductores, regresar el estado normal
            return {
                ...state,
                selectedSource: source,
                selectedTeam: team,
                allDrivers: filteredDrivers,
                currentPage: 1,
            };
              


            case SET_CURRENT_PAGE:
                return {
                ...state,
                currentPage: action.payload,
                };

 
            case ORDER_DRIVERS:

            const orderedDrivers = [...state.driversCopy];
    
            if (action.payload === "Ascending"){
                orderedDrivers.sort((a, b) => a.forename.localeCompare(b.forename))

            } else if (action.payload === "Descending") {

                orderedDrivers.sort((a, b) => b.forename.localeCompare(a.forename))

            } else if (action.payload === "Fecha Asc"){
                orderedDrivers.sort((a, b) => {
                    const dateA = new Date(a.dob);
                    const dateB = new Date(b.dob);
                    return dateA - dateB;
                    })                
                if (action.payload === "Fecha Desc") {
                orderedDrivers.sort((a, b) => {
                    const dateA = new Date(a.dob);
                    const dateB = new Date(b.dob);
                    return dateB - dateA;
                    })
                }
            }
            return {
                ...state,
                allDrivers: orderedDrivers
                } 


        default:
            return state
    }
}

export default reducer;