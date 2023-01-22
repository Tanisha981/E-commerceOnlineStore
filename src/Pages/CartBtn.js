import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CartBtn(props) {

    const cartHandler = async () => {
        props.onActivateCart(true);
    }

    return (
        <Button variant="secondary" onClick={cartHandler}>
            Cart Items <Badge bg="warning">{ props.cart}</Badge>
            <span className="visually-hidden">unread messages</span>
        </Button>
    )
}
export default CartBtn;