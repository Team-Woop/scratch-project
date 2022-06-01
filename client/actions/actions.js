import * as types from '../constants/actionTypes';

export const calculateTotal = total => ({
  type: types.CALCULATE_TOTAL,
  payload: total
})

export const pendingTotal = () => ({
  type: types.PENDING_TOTAL,
  payload: 'loading...'
})