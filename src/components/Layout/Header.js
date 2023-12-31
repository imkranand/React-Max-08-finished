import React from "react";
import mealsImage from '../../assests/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from "./HeaderCartButton";

const Header = props => {
    return(
        <React.Fragment>
            <header className={classes.header}>
                <h1>Happy Meals</h1>
            <HeaderCartButton />
            </header>
            <div className={classes['main-image']}>
                <img  src={mealsImage} alt="Table Full of delicious Image"/>
            </div>
        </React.Fragment>
    );
}

export default Header;