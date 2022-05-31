import React, { useState } from 'react';
import NavContainer from './containers/NavContainer.jsx';
import GasContainer from './containers/GasContainer.jsx';
import ResultsContainer from './containers/ResultsContainer.jsx';


const App = props => {

  // const [count, setCount] = useState(0);

  return (
    <div id="navContainer">
        <NavContainer />
        <GasContainer />
        <ResultsContainer />

    </div>
    // <div id="gasContainer">
    //   <GasContainer />
    // </div>
  )
}


export default App;

/*
container 1: id = nav the top most div: logo [about] [How it Works] [sign up] [log in]
container 2: id = gas
        body:
            h1: Gas Cost
            div:
            h2: where are you going?
            input: "From" input: "To"
            input: "MPG:"

*/