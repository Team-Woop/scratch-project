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
    calculateGas: () => dispatch(actions.calculateGas()), //props.gallonsUsed
    // inputField: () => dispatch(actions.inputField())
  }
);

//   const handleChange = (event) => {
//     state.gallonsUsed = event.target.value;
//   }

const GasContainer = props => {

    return (
        <div className="gasContainer">
            {/* <input onChange={handleChange} type="text"></input><br></br> */}
            <GasButton id='Calculate' key='1' calculate={props.calculateGas} gallonsUsed={props.gallonsUsed}/>
        </div>
        
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(GasContainer);