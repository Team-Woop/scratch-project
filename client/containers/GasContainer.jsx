import React from 'react';
import { connect } from 'react-redux';
import GasButton from '../components/gasButton';
import MPGInput from '../components/mpgInput';
import * as actions from '../actions/actions.js';
// import { dispatch } from 'rxjs/internal/observable/pairs';


const mapStateToProps = state => ({
    mpgUser: state.mpgUser,
    totalDistance: state.totalDistance,
    gallonsUsed: state.gallonsUsed,
    fuelCost: state.fuelCost,
    origin: state.origin,
    destination: state.destination,
    totalCapacity: state.totalCapacity
});

const mapDispatchToProps = dispatch => (
  {
    calculateGas: (mpgUser) => dispatch(actions.calculateGas(mpgUser)),
    getUserMPG: (mpgUser) => dispatch(actions.getUserMPG(mpgUser)),
    getUserOrigin: (origin) => dispatch(actions.getOrigin(origin)),
    getUserDestination: (destination) => dispatch(actions.getDestination(destination)),
    getTotalCapacity: (totalCapacity) => dispatch(actions.getTotalCapacity(totalCapacity))
  }
);

const GasContainer = props => {

    return (
        <div className="gasContainer"> 
            <MPGInput id="Mpg" key='2' getUserMPG={props.getUserMPG} getUserOrigin={props.getUserOrigin} getUserDestination={props.getUserDestination} getTotalCapacity={props.getTotalCapacity}/>
            <GasButton id='Calculate' key='1' userMPG={props.mpgUser} calculate={props.calculateGas} getOrigin={props.getUserOrigin} origin={props.origin} getDestination={props.getUserDestination}
            destination={props.destination} getTotalCapacity={props.getTotalCapacity} totalCapacity={props.totalCapacity}/>
            <p>gallons used: {props.gallonsUsed}</p>
        </div>
        
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(GasContainer);