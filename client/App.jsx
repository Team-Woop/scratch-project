import React, { useState } from 'react';
import NavContainer from './containers/NavContainer.jsx';
import GasContainer from './containers/GasContainer.jsx';
import ResultsContainer from './containers/ResultsContainer.jsx';


const App = props => {
  return (
    <div id="navContainer">
        <NavContainer />
        <GasContainer />
        {/* <ResultsContainer /> */}
    </div>
  )
}

export default App;