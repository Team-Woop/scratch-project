// state => variables/values that are going to change
  // mpgUser, totalDistance, avgGasPerGallon
import * as types from '../constants/actionTypes.js';  

const initialState = {
  mpgUser: 0,
  totalDistance: 0,
  gallonsUsed: 0,
  fuelCost: 0
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.CALCULATE_GAS: {
      // math here
      console.log('calculate gas reducer invoked')
      
      // return updated state
      return {
        ...state,
        gallonsUsed: 20
      }
      
    }
    case types.INPUT_FIELD: {
      // math here
      console.log('MPG input test')
      
      // return updated state
      return {
        ...state,
        mpgUser: 40
      }
      
    }
    default: {
      return state
    } 
  }
}

export default reducer;