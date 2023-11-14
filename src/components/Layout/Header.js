import { Fragment } from 'react';
import '../../style/style.css';
import HeaderImg from '../../assets/open-source-ecommerce.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
    return (
        <Fragment>
            <header className='header'>
                <h1>ReactECommerce</h1>
                <HeaderCartButton onClick={props.onShowCart} />
            </header>
            <div className='main-image'>
                <img src={HeaderImg} alt='E commerce'/>
            </div>
        </Fragment>
    )
}

export default Header;

