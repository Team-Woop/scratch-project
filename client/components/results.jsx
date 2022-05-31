import React from 'react';
const ResultsContainer = require('../containers/ResultsContainer.jsx');
const GasContainer = require('../containers/GasContainer.jsx');

const results = props => {

    return (
        <div className="results">
           <h3>Results:</h3>
           <p>{props.gallonsUsed ? props.gallonsUsed : null}</p>
           <p>{props.origin === '' ? props.origin : null}</p>
           <p>{props.destination === '' ? props.destination : null}</p>
           <p>{props.totalCapacity ? props.totalCapacity : null}</p>
        </div>
    )
};

export default results;