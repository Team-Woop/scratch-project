import * as types from '../constants/actionTypes';

export const calculateGas = userInput => ({
    type: types.CALCULATE_GAS,
    payload: userInput
});

// export const input
export const inputField = userInput => ({
    type: types.INPUT_FIELD,
    payload: userInput
});