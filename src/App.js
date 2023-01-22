import LoginPage from './Pages/LoginPage';
import './App.css';
import Welcome from './Pages/Welcome';
import ItemDescription from './Pages/ItemDescription';

import React, { useState } from 'react';
import { Route } from 'react-router-dom';

import CartItems from './Pages/CartItems';
import Backdrop from './Pages/Backdrop';
import Register from './Pages/Register';

function App() {

  const [activeCartItems, setActiveCartItems] = useState(false)
  const [qty, setQty] = useState(0)

  const activateCartHandler = (displayState) => {
    setActiveCartItems(displayState);
  }

  const qtyHandler = (qty) => {
    setQty(qty);
  }

  return (
    <React.Fragment>

      {activeCartItems && <Backdrop></Backdrop>}

      {activeCartItems && <CartItems onCancelCart={activateCartHandler} onSendingQty={qtyHandler}></CartItems>}

      <Route path='/' exact>
        <Register></Register>
      </Route>

      <Route path='/login' exact>
        <LoginPage></LoginPage>
      </Route>

      <Route path='/welcome'>
        <Welcome showCart={activateCartHandler} qty={qty}></Welcome>
      </Route>

      <Route path='/itemdescription/:itemID/:cartQty'>
        <ItemDescription showCart={activateCartHandler}></ItemDescription>
      </Route>

    </React.Fragment>
  );
}

export default App;
