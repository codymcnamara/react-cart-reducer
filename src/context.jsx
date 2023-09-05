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

const AppContext = createContext();

const initialState = {
    loading: false,
    cart: new Map(cartItems.map((item) => [item.id, item])),
}

export const useGlobalContext = () => useContext(AppContext);

function AppProvider ({children}){
    const [state, dispatch] = useReducer(reducer, initialState)

    const clearCart = () => {
        debugger;
        dispatch({type: CLEAR_CART});
    }

    return (
        <AppContext.Provider value={{...state, clearCart}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;