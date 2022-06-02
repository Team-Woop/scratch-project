// state => variables/values that are going to change
  // mpgUser, totalDistance, avgGasPerGallon
import * as types from '../constants/actionTypes.js';  

const initialState = {
  fuelCost: '$0',
  trips: [],
  currentOrigin: '',
  currentDestination: ''
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.CALCULATE_TOTAL: {
      return {
        ...state,
        fuelCost: action.payload.fuelCost,
        currentOrigin: action.payload.currentOrigin,
        currentDestination: action.payload.currentDestination,
      }
    }
    case types.PENDING_TOTAL: {
      return {
        ...state,
        fuelCost: action.payload
      }
    }
    case types.LOAD_TRIPS_TO_STATE: {
      const trips = [...action.payload];
      return {
        ...state,
        trips: trips,
      }
    }
    default: {
      return state
    } 
  }
}

export default reducer;