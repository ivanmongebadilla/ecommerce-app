import '../../style/style.css';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = (props) => {
    const[btnIsHighlited, setBtnIsHighlited] = useState(false)
    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;

    const numberOfCartItems = items.reduce((curNum, item) => {
        return curNum + item.amount;
    }, 0);

    const btnClasses = `button ${btnIsHighlited ? 'bump' : ''}` 

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHighlited(true);

        const timer = setTimeout(() => {
            setBtnIsHighlited(false)
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className='icon'>
                <CartIcon />
            </span>
            <span>
                Your Cart
            </span>
            <span className='badge'>
                {numberOfCartItems}
            </span>
        </button>
    )
}

export default HeaderCartButton;