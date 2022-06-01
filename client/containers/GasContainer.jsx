import React from 'react';
import { connect } from 'react-redux';
import GasButton from '../components/gasButton';
import MPGInput from '../components/mpgInput';
import * as actions from '../actions/actions.js';
// import { dispatch } from 'rxjs/internal/observable/pairs';


const mapStateToProps = state => ({
    // mpgUser: state.mpgUser,
    // totalDistance: state.totalDistance,
    fuelCost: state.fuelCost,
    // origin: state.origin,
    // destination: state.destination,
    // totalCapacity: state.totalCapacity
    // gallonsUsed: state.gallonsUsed,
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
    calculateTotal: (obj) => {
      console.log('calculateTotal obj arg: ', obj)
      fetch(`/submit/?origin=${obj.origin}&destination=${obj.destination}&mpg=${obj.mpg}&totalCapacity=${obj.totalCapacity}/`,{
        method: 'get'
      })
       .then(res => res.json())
       .then(data => {
         console.log('Receiving total cost data: ', data);
         dispatch(actions.calculateTotal(data));
       })
       .catch(err => {
         console.log('error in calculateTotal', err)
       })
    } 
    /*
    // calculateGas: (mpgUser) => dispatch(actions.calculateGas(mpgUser)),
    // getUserMPG: (mpgUser) => dispatch(actions.getUserMPG(mpgUser)),
    // getUserOrigin: (origin) => dispatch(actions.getOrigin(origin)),
    // getUserDestination: (destination) => dispatch(actions.getDestination(destination)),
    // getTotalCapacity: (totalCapacity) => dispatch(actions.getTotalCapacity(totalCapacity))
    */
  }
);

const GasContainer = props => {

    return (
        <div className="gasContainer"> 
            <MPGInput id="Mpg" key='2' calculateTotal={props.calculateTotal}/>
            {/* <GasButton id='Calculate' key='1' userMPG={props.mpgUser} calculate={props.calculateGas} getOrigin={props.getUserOrigin} origin={props.origin} getDestination={props.getUserDestination}
            destination={props.destination} getTotalCapacity={props.getTotalCapacity} totalCapacity={props.totalCapacity}/> */}
            <p>Total Cost: {props.fuelCost}</p>
        </div>
        
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(GasContainer);