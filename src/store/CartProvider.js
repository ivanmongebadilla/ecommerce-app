import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

//WHEN USING ACTION.ITEM IS REFERS TO THE ITEM DISPATCH IN THE ADDITEMTOCARTHANDLER FUNCTION OR IN THE DISPATCH IN THE REMOVEITEMFROMCARTHANDLER FUNCTION
const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const exisitingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const exisitingCartItem = state.items[exisitingCartItemIndex];

        let updatedItems;

        if (exisitingCartItem) {
            const updatedItem = {
                ...exisitingCartItem,
                amount: exisitingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[exisitingCartItemIndex] = updatedItem
        } else {
            updatedItems = state.items.concat(action.item)
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    };
    if (action.type === 'REMOVE') {
        const exisitingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingItem = state.items[exisitingCartItemIndex]
        const updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter((item) => item.id !== action.id)
        } else {
            const updatedItem = {...existingItem, amount: existingItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[exisitingCartItemIndex] = updatedItem
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if (action.type === 'CLEAR') {
        return defaultCartState;
    }

    return defaultCartState;
};

const CartProvider = props => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const  addItemToCartHandler = item => {
        dispatchCartAction({
            type: 'ADD',
            item: item
        })
    };

    const removeItemFromCartHandler = id => {
        dispatchCartAction({
            type: 'REMOVE',
            id: id
        })
    };

    const clearCartHandler = () => {
        dispatchCartAction({type: 'CLEAR'})
    }
        
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;