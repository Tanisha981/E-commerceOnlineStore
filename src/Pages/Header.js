import styles from '../styles/Header.module.css'
import CartBtn from './CartBtn';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

function Header(props) {

    const history = useHistory();

    const logoutHandler = () =>{
        history.replace('/login')
    }

    return (
        <div className={styles.nav}>
            <h2>Welcome to AMAZON</h2>
            <div>
                <CartBtn cart={props.cartBoxQty} onActivateCart={props.onDisplayCart}></CartBtn>
                <Button className='ms-4' variant="outline-danger" onClick={logoutHandler}>Logout</Button>
            </div>
        </div>
    )
}
export default Header;