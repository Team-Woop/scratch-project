import * as types from '../constants/actionTypes';

export const calculateGas = userInput => ({
    type: types.CALCULATE_GAS,
    payload: userInput
});

export const getUserMPG = userInput => ({
    type: types.GET_USER_MPG,
    payload: userInput
});

export const getOrigin = userInput => ({
    type: types.GET_USER_ORIGIN,
    payload: userInput
});

export const getDestination = userInput => ({
    type: types.GET_USER_DESTINATION,
    payload: userInput
})

export const getTotalCapacity = userInput => ({
    type: types.GET_TOTAL_CAPACITY,
    payload: userInput
})

export const calculateTotal = total => ({
  type: types.CALCULATE_TOTAL,
  payload: total
})