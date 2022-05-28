import * as types from '../constants/actionTypes';

export const calculateGas = userInput => ({
    type: types.CALCULATE_GAS,
    payload: userInput
});