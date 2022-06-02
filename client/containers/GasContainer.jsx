import React from 'react';
import { connect } from 'react-redux';
import MPGInput from '../components/mpgInput';
import TripHistory from '../components/tripHistory.jsx'
import * as actions from '../actions/actions.js';


const mapStateToProps = state => ({
    fuelCost: state.fuelCost,
    totalTrips: state.totalTrips,
    currentOrigin: state.currentOrigin,
    currentDestination: state.currentDestination,
});

const mapDispatchToProps = dispatch => (  
  {
    /*
    ** We merged the functionality of the calculateGas, getUserMPG, getUserOrigin, getUserDestination, and getTotalCapacity
    * into calculateTotal. We figured they were all effectively part of the same form so having separate dispatch calls was
    * unnecessary. To asynchronously call the external APIs we needed to use 'Thunk' methodology to delay the calling of the
    * action/reducer workflow. 
    * Further, we also deleted the gasButton component and just created a button in the MPGinput component
    **
    */
    loadTripsToState: (trips) => dispatch(actions.loadTripsToState(trips)),

    calculateTotal: (obj) => {
      dispatch(actions.pendingTotal()) // this leaves a loading message while the dispath within the fetch request actually pulls the data

      fetch(`/submit/?originCity=${obj.originCity}&originState=${obj.originState}&destinationState=${obj.destinationState}&destinationCity=${obj.destinationCity}&mpg=${obj.mpg}&totalCapacity=${obj.totalCapacity}/`,{
        method: 'get'
      })
       .then(res => res.json())
       .then(data => {
         if (typeof data !== 'number') throw new Error('caculateTotal get req must respond with number')
         const actionData = {
            fuelCost: '$' + parseInt(data).toString(),
            currentOrigin: obj.originCity,
            currentDestination: obj.destinationCity
         }
         dispatch(actions.calculateTotal(actionData));
       })
       .catch(err => {
         console.log('error in calculateTotal', err)
       })
    }
  }
);

const GasContainer = props => {

  //updates local storage and reflects in state
  if (props.fuelCost !== '$0' && props.fuelCost !== 'loading...' && props.fuelCost){
    const trips = JSON.parse(window.localStorage.getItem('trips'));
    trips.push({
      cost: props.fuelCost,
      origin: props.currentOrigin,
      destination: props.currentDestination
    });
    window.localStorage.setItem('trips', JSON.stringify(trips))
    props.loadTripsToState(trips);
  }

  let innerText = `Trip cost from ${props.currentOrigin} to ${props.currentDestination}: ${props.fuelCost}`;
  if (props.fuelCost === '$0' || props.fuelCost === 'loading...'){
    innerText = 'Trip cost: ' + props.fuelCost;
  }

  return (
    <div className="pageContainer">
      <img id="woop" src="https://i.imgur.com/3XGmJOU.png" height="150px" width="150px" />
      <div className="gasContainer">
        <div className="currentTrip">
          <MPGInput id="Mpg" key="2" calculateTotal={props.calculateTotal} />
          <h3 className="gradnTotalResult">Results:</h3>
          <p>{innerText}</p>
        </div>
        <TripHistory />
        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/oU1D6aK7HsI?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; &autoplay= 1; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
      </div>
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(GasContainer);