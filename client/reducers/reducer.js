// state => variables/values that are going to change
  // mpgUser, totalDistance, avgGasPerGallon
import * as types from '../constants/actionTypes.js';  

const initialState = {
  totalTrips: 0,
  fuelCost: '$0',
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.CALCULATE_TOTAL: {
      return {
        ...state,
        fuelCost: action.payload,
        totalTrips: state.totalTrips + 1
      }
    }
    case types.PENDING_TOTAL: {
      return {
        ...state,
        fuelCost: action.payload
      }
    }
    default: {
      return state
    } 
  }
}

export default reducer;