// state => variables/values that are going to change
  // mpgUser, totalDistance, avgGasPerGallon
import * as types from '../constants/actionTypes.js';  

const initialState = {
  mpgUser: 0,
  totalDistance: 0,
  gallonsUsed: 0,
  fuelCost: 0,
  origin: '',
  destination: '',
  totalCapacity: 0,
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.CALCULATE_GAS: {
      // math here
      let num = Number(action.payload);
      // console.log('calculate gas reducer invoked')
      // console.log(action.payload)
      // return updated state
      return {
        ...state,
        gallonsUsed: num
      }
    }
    case types.GET_USER_MPG: {
      // console.log('get user MPG reducer invoked')
      //send this number to the backend
      return {
        ...state,
        mpgUser: action.payload
      }
    }
    case types.GET_USER_ORIGIN: {
      console.log('get user Origin invoked')
      return {
        ...state,
        origin: action.payload
      }
    }
    case types.GET_USER_DESTINATION: {
      console.log('get user Destination invoked')
      console.log('payload for get user destination: ', action.payload)
      return {
        ...state,
        destination: action.payload
      }
    }
    case types.GET_TOTAL_CAPACITY: {
      console.log('get total capacity reducer invoked')

      let num = Number(action.payload)

      return {
        ...state,
        totalCapacity: num
      }
    }
    default: {
      return state
    } 
  }
}

export default reducer;