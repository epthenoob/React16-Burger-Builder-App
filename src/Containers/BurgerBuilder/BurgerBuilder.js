import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import BurgerSummary from '../../Components/Burger/BurgerSummary/BurgerSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0, 
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    
    updatePurchaseState = (ingredients) => {
        // console.log(ingredients);
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        },0)
        // console.log(sum);    
        this.setState({purchasable: sum > 0});    
    }
    
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert("You are Continue!");
    }

    addIngredientHandler = (type) => {
        // Updated ingredients process
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        
        // Updated price process
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState (updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        // Updated ingredients process
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        
        // Updated price process
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState (updatedIngredients);
    }

    render() {
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            // fill disabledInfo[key] with true/false statement
            // salad: true/false, meat:true/false
            disabledInfo[key] = disabledInfo[key] <= 0; 
        }

        return (
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <BurgerSummary 
                        purchaseCanceled = {this.purchaseCancelHandler}
                        purchaseContinued = {this.purchaseContinueHandler}
                        totalPrice = {this.state.totalPrice}
                        ingredients = {this.state.ingredients}/>
                </Modal>  
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    price = {this.state.totalPrice.toFixed(2)}
                    purchasable = {this.state.purchasable}
                    ordered = {this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;