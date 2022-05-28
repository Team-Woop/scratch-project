import React from 'react';
import { connect } from 'react-redux';
import GasButton from '../components/gasButton';
import * as actions from '../actions/actions.js';
// import { dispatch } from 'rxjs/internal/observable/pairs';


const mapStateToProps = state => ({
    mpgUser: state.mpgUser,
    totalDistance: state.totalDistance,
    gallonsUsed: state.gallonsUsed,
    fuelCost: state.fuelCost
});

const mapDispatchToProps = dispatch => (
  {
    calculateGas: () => dispatch(actions.calculateGas())
  }
);

const GasContainer = props => {

    return (
        <div className="gasContainer">
            <GasButton id='Calculate' key='1' calculate={props.calculateGas}/>
        </div>
        
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(GasContainer);