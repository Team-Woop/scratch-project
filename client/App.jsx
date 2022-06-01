import React from 'react';
import NavContainer from './containers/NavContainer.jsx';
import GasContainer from './containers/GasContainer.jsx';


const App = props => {
  return (
    <div id="navContainer">
        <NavContainer />
        <GasContainer />
    </div>
  )
}

export default App;