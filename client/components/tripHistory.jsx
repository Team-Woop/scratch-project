import React from 'react';
import Trip from './trip.jsx';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  trips: state.trips
})

const TripHistory = props => {
  const { trips } = props;
  const tripsArr = [];
  for (let i = 1; i < trips.length; i++) {
    let trip = trips[i];
    tripsArr.push(<Trip key={`trip${i}`} id={`trip${i}`} cost={trip.cost} origin={trip.origin} destination={trip.destination}/>)
  }

  return (
    <div className='tripHistoryContainer'>
      <header id='tripHistoryHeader'>Your Trip Search History:</header>
      {tripsArr}
    </div>
  );
};


export default connect(mapStateToProps)(TripHistory);