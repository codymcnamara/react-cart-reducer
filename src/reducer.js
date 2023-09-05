import { 
    CLEAR_CART, 
    REMOVE, 
    INCREASE, 
    DECREASE, 
    DISPLAY_ITEMS, 
    LOADING 
} from './actions';

const reducer = (state, action) => {
    
    if(action.type === REMOVE){
        const newCart= new Map(state.cart);
        return {...state, cart: newCart };

    }

    if (action.type === CLEAR_CART){
        return {...state, cart: new Map() };
    }

    if (action.type === INCREASE) {
        const newCart = new Map(state.cart);
        let itemId = action.payload.id;
        let item = newCart.get(itemId);
        let newItem = {...item, amount: item.amount + 1}
        newCart.set(itemId, newItem);

        return {...state, cart: newCart };
    }
    
    throw new Error(`No matching "${action.type}" - action type`);
}

export default reducer;