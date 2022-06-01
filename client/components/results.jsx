import React from 'react';
const ResultsContainer = require('../containers/ResultsContainer.jsx');
const GasContainer = require('../containers/GasContainer.jsx');

const mapStateToProps = state => ({
    fuelCost: state.fuelCost
});

const results = props => {

    return (
        <div className="results">
           <h3>Results:</h3>
           <p>{props.gallonsUsed ? props.gallonsUsed : null}</p>
           <p>{props.origin === '' ? props.origin : null}</p>
           <p>{props.destination === '' ? props.destination : null}</p>
           <p>{props.totalCapacity ? props.totalCapacity : null}</p>
           <p>Total Fuel Cost: {props.fuelCost}</p>
        </div>
    )
};

export default results;