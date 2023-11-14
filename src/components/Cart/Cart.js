import CartContext from '../../store/cart-context';
import '../../style/style.css';
// import Modal from '../UI/Modal';
import { Modal } from 'reactstrap';
import React, { useContext, useState } from 'react';
import CartItem from './CartItem';
import Checkout from './Checkout';

const url = 'http://localhost:3000/orders';

const Cart = props => {
    const [ordered, setOrdered] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(null);

    const cartCtx = useContext(CartContext)
    console.log(cartCtx)

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        console.log("Entering cartItemRemoveHandler")
        cartCtx.removeItem(id)
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1})
    };

    const orderHandler = () => {
        setOrdered(true)
    }

    const cancelOrderHandler = () => {
        setOrdered(false)
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true)
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    'user': userData,
                    'orderedItems': cartCtx.items
                })
            });

            if (!response.ok) {
                throw new Error('Soemthing went wrong!')
              }
        } catch (error) {
            setError(error.message)
        }
        setIsSubmitting(false);
        setSubmitted(true);
        cartCtx.clearCart();
    }

    const cartItems =<ul className='cart-items'>{cartCtx.items.map((item) => {
        return <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)}/>
    })}</ul>;

    const cartModalContent = (<React.Fragment>
        {cartItems}
        <div className='total'>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        { ordered && <Checkout cancelOrder={cancelOrderHandler} submitOrder={submitOrderHandler} />}
        { !ordered && (
            <div className='actions'>
                <button className='button--alt' onClick={props.onClose}>Close</button>
                {hasItems && <button className='button' onClick={orderHandler}>Order</button>}
            </div>
            )
        }
    </React.Fragment>);

    const isSubmittingModalContent = (
        <p>Sending order data...</p>
    )

    const didSubmitModalContent = (
        <React.Fragment>
            <p>Successfully sent the order!</p>
            <button className='button' onClick={props.onClose}>Done</button>
        </React.Fragment>
    );

    const errorModalContent = (
        <React.Fragment>
            <p>{error}</p>
            <button className='button' onClick={props.onClose}>Done</button>
        </React.Fragment>
    )

    return (
        <Modal isOpen={true} className='my-modal-content'>
            {!isSubmitting && !submitted && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && submitted && !error && didSubmitModalContent}
            {!isSubmitting && error && errorModalContent}
        </Modal>
    )
}

export default Cart;