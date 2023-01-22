import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../styles/LoginPage.module.css'

function LoginPage(props) {
    const [userEmail, setUserEmail] = useState('');
    const [userPasswd, setUserPasswd] = useState('');
    const [formValidation, setFormValidation] = useState(true);
    const history = useHistory();

    const emailHandler = (event) => {
        setUserEmail(event.target.value);
        if (event.target.value.includes('@gmail.com') && userPasswd.length >= 6) {
            setFormValidation(false);
        }
        else {
            setFormValidation(true);
        }
    }

    const passwdHandler = (event) => {
        setUserPasswd(event.target.value);
        if (userEmail.includes('@gmail.com') && event.target.value.length >= 6) {
            setFormValidation(false);
        }
        else {
            setFormValidation(true);
        }
    }

    const loginFormHandler = (event) => {
        event.preventDefault();
        if (userEmail.includes('@gmail.com') && userPasswd.length >= 6) {
            history.replace('/welcome')
        }
    }

    return (
        <form onSubmit={loginFormHandler} className={styles.form_col}>
            <div className={styles.rows}>
                <label>Email</label>
                <input type='text' onChange={emailHandler} />
            </div>
            <div className={styles.rows}>
                <label>Password</label>
                <input type='password' onChange={passwdHandler} />
            </div>
            <button className={formValidation ? styles.invalid : ''} disabled={formValidation} >Submit</button>
        </form>
    )
}
export default LoginPage;