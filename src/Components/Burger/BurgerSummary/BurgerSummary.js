import React from 'react';
import Aux from '../../../hoc/Auxiliary';

const burgerSummary = (props) => {

    // console.log(props.ingredients);
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key = {igKey}>
                    <span style = {{textTransform: 'capitalize'}} >{igKey}</span> : {props.ingredients[igKey]}
                </li>    
            );
        });


    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients : </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Do you want to checkout ?</p>    
        </Aux>    
    );
}

export default burgerSummary;