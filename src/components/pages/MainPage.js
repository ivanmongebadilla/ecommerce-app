import { useState } from "react";
import Cart from "../Cart/Cart";
import Header from "../Layout/Header";
import ComerceIntro from '../Commerce/ComerceIntro';

const MainPage = () => {
    const [cartIsShown, setCartIsShown] = useState(false);

    const showCartHandler = () => {
        setCartIsShown(true)
      }
    
    const hideCartHandler = () => {
        setCartIsShown(false)
    }

    return (
        <main>
            {cartIsShown && <Cart onClose={hideCartHandler}/>}
            <Header onShowCart={showCartHandler} />
            <main>
                <ComerceIntro />
            </main>
        </main>
    )
}

export default MainPage;