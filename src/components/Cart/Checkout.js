import { useRef, useState } from 'react';
import '../../style/style.css';

const isEmpty = value => value.trim() === '';
const isFive = value => value.trim().length === 5

const Checkout = (props) => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postal: true
    })

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();
    
    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalIsValid = isFive(enteredPostal);

        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postal: enteredPostalIsValid
        })

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid;

        if (!formIsValid) {
            return;
        }

        props.submitOrder({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postal: enteredPostal
        });
    }

    return (
        <form className='checkout__form' onSubmit={confirmHandler}>
            <div className='checkout__control'>
                <label htmlFor="name">Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputValidity.name && <p className='checkout__invalid'>Please enter a valid name</p>}
            </div>
            <div className='checkout__control'>
                <label htmlFor="street">Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputValidity.street && <p className='checkout__invalid'>Please enter a valid street</p>}
            </div>
            <div className='checkout__control'>
                <label htmlFor="postal">Postal Code</label>
                <input type='text' id='postal' ref={postalInputRef} />
                {!formInputValidity.postal && <p className='checkout__invalid'>Please enter a valid postal</p>}
            </div>
            <div className='checkout__control'>
                <label htmlFor="city">City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputValidity.city && <p className='checkout__invalid'>Please enter a valid city</p>}
            </div>
            <div className='checkout__actions'>
                <button className='checkout__actions-cancel' type='button' onClick={props.cancelOrder}>Cancel</button>
                <button className='checkout__actions-submit'>Confirm</button>
            </div>  
        </form>
    )
}

export default Checkout;