import React from 'react';
import Trip from './trip.jsx';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

const mapStateToProps = state => ({
  trips: state.trips
})

const mapDispatchToProps = dispatch => ({
  loadTripsToState: trips => dispatch(actions.loadTripsToState(trips))
})

const TripHistory = props => {

  const handleRemove = event => {
    event.preventDefault();
    const trips = JSON.parse(window.localStorage.getItem('trips'))
    trips.splice(parseInt(event.target.id), 1)
    window.localStorage.setItem('trips', JSON.stringify(trips))
    props.loadTripsToState(JSON.parse(window.localStorage.getItem('trips')))
  } 

  const { trips } = props;

  const tripsArr = [];
  let grandTotal = 0;
  for (let i = 0; i < trips.length; i++) {
    let trip = trips[i];
    grandTotal += parseInt(trip.cost.slice(1));
    tripsArr.push(<Trip key={`trip${i}`} id={i} cost={trip.cost} origin={trip.origin} destination={trip.destination} handleRemove={handleRemove}/>)
  }

  return (
    <div className='tripHistoryContainer'>
      <header id='tripHistoryHeader'>Your Trip Search History:</header>
      {tripsArr}
      <div>Grand total: ${grandTotal}</div>
    </div>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(TripHistory);