import { createContext, useContext, useReducer } from 'react';
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

const AppContext = createContext();

const initialState = {
    loading: false,
    cart: new Map(cartItems.map((item) => [item.id, item])),
}

export const useGlobalContext = () => useContext(AppContext);

function AppProvider ({children}){
    const [state, dispatch] = useReducer(reducer, initialState)

    const {totalAmount, totalCost} = getTotals(state.cart);

    const clearCart = () => {
        dispatch({type: CLEAR_CART});
    }

    const removeItem = (id) => {
        // debugger;
        dispatch({type: REMOVE, payload: {id}})
    }

    const increaseItem = (id) => {
        dispatch({type: INCREASE, payload: {id}});
    }
    const decreaseItem = (id) => {
        dispatch({type: DECREASE, payload: {id}});
    }

    return (
        <AppContext.Provider value={{...state, clearCart, removeItem, increaseItem, decreaseItem, totalAmount, totalCost}}>
            {children} 
        </AppContext.Provider>
    )
}

export default AppProvider;