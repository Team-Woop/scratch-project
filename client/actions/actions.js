import * as types from '../constants/actionTypes';

export const calculateTotal = total => ({
  type: types.CALCULATE_TOTAL,
  payload: total
})

export const pendingTotal = () => ({
  type: types.PENDING_TOTAL,
  payload: 'loading...'
})

export const loadTripsToState = trips => ({
  type: types.LOAD_TRIPS_TO_STATE,
  payload: trips
})

export const removeTrip = arg => ({
  type: types.REMOVE_TRIP,
  payload: arg
})