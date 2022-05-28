import React from 'react';

const NavButton = props => {

    return (
        <div className="navBar">
            <button>{props.id}</button>
        </div>
    );
};

//
export default NavButton;