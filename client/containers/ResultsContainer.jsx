import React from 'react';
import { connect } from 'react-redux';
import GasButton from '../components/gasButton';
import MPGInput from '../components/mpgInput';
import Results from '../components/results';
import * as actions from '../actions/actions.js';
import GasContainer from './GasContainer';

const mapStateToProps = state => ({
    mpgUser: state.mpgUser,
    totalDistance: state.totalDistance,
    gallonsUsed: state.gallonsUsed,
    fuelCost: state.fuelCost,
    origin: state.origin,
    destination: state.destination,
    totalCapacity: state.totalCapacity
});

const ResultsContainer = props => {

    return (
        <div className="resultsContainer">
            <Results mpgUser={props.mpgUser} gallonsUsed={props.gallonsUsed} origin={props.origin} destination = {props.destination} totalCapacity = {props.totalCapacity}/>
        </div>
        
    )
}

export default connect(mapStateToProps)(ResultsContainer);