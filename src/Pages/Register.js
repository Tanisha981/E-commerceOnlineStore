import React, { useState } from 'react';
import styles from '../styles/Register.module.css';
import { Link, useHistory } from 'react-router-dom';
// import axios from 'axios';

function Register(props) {

    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const history = useHistory()
    // const url = 'https://bountyandthreads.azurewebsites.net/admin_Register';

    let data = { userEmail, userPassword }

    const emailHandler = (event) => {
        setUserEmail(event.target.value)
    }

    const passwordHandler = (event) => {
        setUserPassword(event.target.value)
    }

    const registerUserHandler = () => {
        console.log('user Data ', userEmail, userPassword)
        history.replace('/login');

        // axios.post(url, {
        //     "admin_name": data.userName,
        //     "email": data.userEmail,
        //     "password": data.userPassword,
        //     "repassword": data.userRePassword,
        //     "address": data.userAddress,
        //     "phone": data.userContact
        // }).then(res => console.log('res', res)).catch(error => console.log('error', error));

    }

    return (
        <div className={styles.registration_layer}>
            <h1>Amazon Services</h1>
            <h4 className='mb-4'>CREATE AN ACCOUNT</h4>

            <div className={styles.input_fields}>
                <label>Email</label>
                <input type='email' placeholder="Enter your Email" onChange={emailHandler}></input>
            </div>
            <div className={styles.input_fields}>
                <label>Password</label>
                <input type='password' placeholder="Set your Password" onChange={passwordHandler}></input>
            </div>

            <div className={styles.input_fields}>
                <button onClick={registerUserHandler}>Register</button>
            </div>

            <Link to='/login'>Already Have an Account?</Link>

        </div>
    )
}
export default Register;