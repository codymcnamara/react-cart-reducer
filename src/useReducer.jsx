import { useReducer } from "react";
import reducer from './reducer';
import cartItems from './data';

const defaultState = {
    cartItems: cartItems  
};

const ReducerBasics = ()=> {
    const [state, dispatch] = useReducer(defaultState)
}

export default ReducerBasics;