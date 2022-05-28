import React from 'react';
import NavButton from '../components/navButton';
import * as actions from '../actions/actions.js';

// function mapStateToProps(state)

const NavContainer = props => {

    const buttons = [];
    const button_id = ['About', 'How it works', 'Sign Up', 'Log In']
    
    for (let i = 0; i < 4; i++){
        buttons.push(<NavButton id={button_id[i]} key={button_id[i]}/>) //location={props.about} 
    }


    return (
        <div className="navBar">
            <img src="https://i.imgur.com/3XGmJOU.png" height='150px' width='150px'/>
            {buttons}
        </div>
    );
};

/*
array
for loop:
    create 4 navBarButtons
*/

export default NavContainer;