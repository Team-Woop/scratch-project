import React from 'react';
import { connect } from 'react-redux';
import MPGInput from '../components/mpgInput';
import * as actions from '../actions/actions.js';


const mapStateToProps = state => ({
    fuelCost: state.fuelCost,
    totalTrips: state.totalTrips
});

const mapDispatchToProps = dispatch => (  
  {
    /*
    ** We merged the functionality of the calculateGas, getUserMPG, getUserOrigin, getUserDestination, and getTotalCapacity
    * into calculateTotal. We figured they were all effectively part of the same form so having separate dispatch calls was
    * unnecessary. To asynchronously call the external APIs we needed to use 'Thunk' methodology to delay the calling of the
    * action/reducer workflow. 
    * Further, we also deleted the gasButton component and just created a button in the MPGinput component
    * 
    **
    */
    loadTripsToState: (trips) => dispatch(actions.loadTripsToState(trips)),

    calculateTotal: (obj) => {
      console.log('calculateTotal obj arg: ', obj)
      dispatch(actions.pendingTotal()) // this leaves a loading message while the dispath within the fetch request actually pulls the data

      fetch(`/submit/?originCity=${obj.originCity}&originState=${obj.originState}&destinationState=${obj.destinationState}&destinationCity=${obj.destinationCity}&mpg=${obj.mpg}&totalCapacity=${obj.totalCapacity}/`,{
        method: 'get'
      })
       .then(res => res.json())
       .then(data => {
         console.log('Receiving total cost data: ', data);
         dispatch(actions.calculateTotal('$' + parseInt(data).toString()));
       })
       .catch(err => {
         console.log('error in calculateTotal', err)
       })
    }
  }
);

const GasContainer = props => {
  
  //set trips to local storage and update to store
  if (props.fuelCost !== '$0' && props.fuelCost !== 'loading...' && props.fuelCost){
    // window.localStorage.clear()
    const trips = {};
    if (window.localStorage.trips) {
      Object.assign(trips, JSON.parse(window.localStorage.getItem('trips')))
    }
    trips[props.totalTrips] = {cost: props.fuelCost};
    window.localStorage.setItem('trips', JSON.stringify(trips))
    props.loadTripsToState(JSON.parse(window.localStorage.getItem('trips')));
    console.log(JSON.parse(window.localStorage.getItem('trips')))
  }

  return (
    <div className="gasContainer"> 
      <MPGInput id="Mpg" key='2' calculateTotal={props.calculateTotal}/>
      <h3>Results:</h3>
      <p>Total Cost: {props.fuelCost}</p>
    </div>   
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(GasContainer);