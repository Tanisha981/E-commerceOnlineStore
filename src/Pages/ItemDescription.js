import styles from '../styles/ItemDescription.module.css'
import Rating from '@mui/material/Rating';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ItemDescription(props) {

    const [userData, setUserData] = useState([])
    const param = useParams();

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("https://shopus-a4523-default-rtdb.firebaseio.com/products.json");
            const data = await response.data;
            let itemDetails = []
            for (let item in data) {
                itemDetails.push({
                    key: item,
                    image_link: data[item].image_link,
                    description: data[item].description,
                    price: data[item].price,
                    title: data[item].title
                })
            }
            let item_description = [];
            item_description.push(itemDetails.find(item => param.itemID === item.key));
            setUserData(item_description);
        }
        fetchData();
    }, [])

    return (
        <React.Fragment>
            <Header cartBoxQty={param.cartQty} onDisplayCart={props.showCart}></Header>
            {userData.map(item => {
                return(<div className={`${styles.desc_page} border-bottom pb-4`} key={item.key}>
                    <div className={styles.item_img}>
                        <img src={item.image_link} alt='Shirts' />
                    </div>
                    <div className={`${styles.desc} w-50`}>
                        <div className='border-bottom'>
                            <h2>{`Amazon Brand - ${item.title}'s Cotton Regular`}</h2>
                            <Rating name="read-only" value={3} readOnly />
                        </div>
                        <h3>{item.title}</h3>
                        <p>Price: Rs {item.price}</p>
                        <p>{item.description}</p>
                        <ul>
                            <li>Care Instructions: Machine wash warm, wash dark colors separately, do not bleach, tumble dry low, warm iron, do not iron on print</li>
                            <li>Fit Type: Regular</li>
                            <li>Material Composition: 100% Cotton</li>
                            <li>Fit Type: Regular Fit</li>
                        </ul>
                    </div>
                </div>)
            })}
            <div className='ps-2'>
                <h4>Special offers and product promotions</h4>
                <ul>
                    <li>10% Instant Discount up to INR 500 on OneCard Credit Card Trxn. Min purchase value INR 2500</li>
                    <li>5% Instant Discount up to INR 250 on HSBC Cashback Card Credit Card Transactions. Minimum purchase value INR 1000</li>
                    <li>No cost EMI available on select cards. Please check 'EMI options' above for more details. </li>
                    <li>Get GST invoice and save up to 28% on business purchases.</li>
                </ul>
            </div>
        </React.Fragment>
    )
}
export default ItemDescription;