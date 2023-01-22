import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from '../styles/CartItems.module.css';

import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';

function CartItems(props) {

    const [cartData, setCartData] = useState([])
    const [price, setPrice] = useState(0)

    useEffect(() => {
        async function displayItems() {
            const response = await axios.get("https://shopus-a4523-default-rtdb.firebaseio.com/shoppingitems.json");
            const data = await response.data;
            let itemDetails = []
            let price = 0
            for (let item in data) {
                itemDetails.push({
                    key: item,
                    qty: data[item].qty,
                    image_link: data[item].image_link,
                    description: data[item].description,
                    price: data[item].price * data[item].qty,
                    title: data[item].title
                })
                price += data[item].price * data[item].qty
            }
            setCartData(itemDetails);
            setPrice(price)
            props.onSendingQty(itemDetails.length)
        }
        displayItems();
    }, [])

    const addItemHandler = (item_key, item_qty) => {
        axios.patch(`https://shopus-a4523-default-rtdb.firebaseio.com/shoppingitems/${item_key}.json`, { "qty": item_qty + 1 })

        let qtyUpdate = cartData.filter(item => item.key === item_key)

        setPrice(prev => prev + qtyUpdate[0].price / qtyUpdate[0].qty)
        qtyUpdate[0].price += qtyUpdate[0].price / qtyUpdate[0].qty
        qtyUpdate[0].qty += 1;

        props.onSendingQty(cartData.length)

        setCartData(prev => {
            return ([...prev])
        })
    }

    const removeItemHandler = (index, item_key, item_qty) => {
        if (item_qty !== 0) {

            axios.patch(`https://shopus-a4523-default-rtdb.firebaseio.com/shoppingitems/${item_key}.json`, { "qty": item_qty - 1 })

            let qtyUpdate = cartData.filter(item => item.key === item_key)

            setPrice(prev => prev - qtyUpdate[0].price / qtyUpdate[0].qty)
            qtyUpdate[0].price -= qtyUpdate[0].price / qtyUpdate[0].qty
            qtyUpdate[0].qty -= 1;

            for (let item of cartData) {
                if (item.qty === 0) {
                    axios.delete(`https://shopus-a4523-default-rtdb.firebaseio.com/shoppingitems/${item.key}.json`)
                    cartData.splice(index, 1)
                    props.onSendingQty(cartData.length)
                }
            }

            setCartData(prev => {
                return ([...prev])
            })
        }
    }

    const cancelCartHandler = () => {
        props.onCancelCart(false);
    }

    const orderSuccessfulHandler = () => {
        props.onCancelCart(false);

        for (let item of cartData) {
            axios.delete(`https://shopus-a4523-default-rtdb.firebaseio.com/shoppingitems/${item.key}.json`)
            setCartData([])
            props.onSendingQty(0);
        }
        swal("Order Successfull!", "Keep Browsing", "success");
    }

    return (
        <React.Fragment>
            <div className={`${styles.cart_box} ${cartData.length > 3 ? styles.cart_height : ''}`}>
                <div className={`${cartData.length > 3 ? styles.cart_overflow : ''}`}>
                    {
                        cartData.map((item, index) => {
                            return (<div className={`${styles.cart_item} pb-1 border-bottom mb-2`} key={index}>
                                <div className={styles.cart_images}>
                                    <img src={item.image_link} alt='Images'></img>
                                </div>
                                <div>
                                    <h4>{item.title}</h4>
                                    <p>Price: Rs {item.price}</p>
                                    <p>Qty. {item.qty}</p>
                                </div>
                                <div>
                                    <Button variant="outline-danger" className="me-3" onClick={() => removeItemHandler(index, item.key, item.qty)}>-</Button>
                                    <Button variant="outline-success" onClick={() => addItemHandler(item.key, item.qty)}>+</Button>
                                </div>
                            </div>)
                        })
                    }
                </div>
                < div className="mt-3">
                    {cartData.length === 0 && <h3 className="mb-4">No Items in Cart! Keep Browsing</h3>}
                    <h5>Total Price: Rs. {price}</h5>
                    <Button variant="danger" className="me-3" onClick={cancelCartHandler}>Cancel</Button>
                    {cartData.length !== 0 && <Button variant="outline-success" onClick={orderSuccessfulHandler}>Order Items</Button>}
                </div>
            </div>
        </React.Fragment >
    )
}
export default CartItems;