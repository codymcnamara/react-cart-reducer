import { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from './reducer';
import cartItems from './data';
import { 
    CLEAR_CART, 
    REMOVE, 
    INCREASE, 
    DECREASE, 
    DISPLAY_ITEMS, 
    LOADING 
} from './actions';
import { getTotals } from './utils';

const url = 'https://www.course-api.com/react-useReducer-cart-project';

const AppContext = createContext();

const initialState = {
    loading: true,
    cart: [],
}

export const useGlobalContext = () => useContext(AppContext);

function AppProvider ({children}){
    const [state, dispatch] = useReducer(reducer, initialState)

    const {totalAmount, totalCost} = getTotals(state.cart);

    const clearCart = () => {
        dispatch({type: CLEAR_CART});
    }

    const removeItem = (id) => {
        dispatch({type: REMOVE, payload: {id}})
    }

    const increaseItem = (id) => {
        dispatch({type: INCREASE, payload: {id}});
    }
    const decreaseItem = (id) => {
        dispatch({type: DECREASE, payload: {id}});
    }

    async function fetchData() {
        try {
            let response = await fetch(url);
            let cartItems = await response.json();
            console.log(cartItems);
        }catch {

        }

    }

    async function fetchUrl() {
        try {
            dispatch({type: LOADING, payload: {loading: true}});
            let response = await fetch(url);
            let cartItems = await response.json();
            console.log(cartItems);
            let cart = new Map(cartItems.map((item) => [item.id, item]));
        
            dispatch({type: DISPLAY_ITEMS, payload: {cart}});
            dispatch({type: LOADING, payload: {loading: false}});
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(()=>{
        fetchUrl();
    }, []);
    


    return (
        <AppContext.Provider value={{...state, clearCart, removeItem, increaseItem, decreaseItem, totalAmount, totalCost}}>
            {children} 
        </AppContext.Provider>
    )
}

export default AppProvider;