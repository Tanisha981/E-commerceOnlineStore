import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import styles from '../styles/Welcome.module.css'

import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import coverpage1 from '../amazonimages/coverpagebooks.jpg'
import coverpage2 from '../amazonimages/coverpagesale.jpg'
import coverpage3 from '../amazonimages/coverpageshop.jpg'

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import Footer from './Footer';

function Welcome(props) {

    const [retriveItems, setretriveItems] = useState([])
    const coverimageArray = [coverpage1, coverpage2, coverpage3];

    const [qty, setQty] = useState(0);


    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("https://shopus-a4523-default-rtdb.firebaseio.com/.json");
            const data = await response.data.products;
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
            setretriveItems(itemDetails);

            let cart_items = response.data.shoppingitems;
            for (let item in cart_items) {
                setQty(prev => prev + 1)
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        setQty(props.qty)
    }, [props.qty])

    const cartHandler = async (key, image_link, title, description, price) => {

        const itemDetails = {
            key,
            qty: 1,
            image_link,
            title: title,
            description: description,
            price: price,
        }

        const response = await axios.get("https://shopus-a4523-default-rtdb.firebaseio.com/shoppingitems.json");
        const data = await response.data;
        if (data === null) {
            fetch("https://shopus-a4523-default-rtdb.firebaseio.com/shoppingitems.json", {
                method: 'POST',
                body: JSON.stringify(itemDetails),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setQty(prev => prev + 1)
            return;
        }
        let checkRedundancy = false;
        for (let item in data) {
            if (itemDetails.key === data[item].key) {
                checkRedundancy = true;
                axios.patch(`https://shopus-a4523-default-rtdb.firebaseio.com/shoppingitems/${item}.json`, { "qty": data[item].qty + 1 })
                break;
            }
            else {
                checkRedundancy = false;
            }

        }
        if (!checkRedundancy) {
            fetch("https://shopus-a4523-default-rtdb.firebaseio.com/shoppingitems.json", {
                method: 'POST',
                body: JSON.stringify(itemDetails),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setQty(prev => prev + 1)
        }

    }

    return (
        <div>
            <Header cartBoxQty={qty} onDisplayCart={props.showCart}></Header>

            <Carousel>
                {coverimageArray.map((images, index) => {
                    return (<Carousel.Item key={index}>
                        <img
                            className={`d-block w-100 ${styles.coverimg}`}
                            src={images}
                            alt="First slide"
                        />
                    </Carousel.Item>)
                })}
            </Carousel>

            <h2 className='border-bottom text-center mt-5 mb-3'>My Listings</h2>

            <Row xs={2} md={4} className="g-4 me-0">
                {Array.from(retriveItems).map((item, idx) => (
                    <Col key={idx}>
                        <Card>
                            <Card.Img variant="top" src={item.image_link} className={styles.cardimg} />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>{item.description}</Card.Text>
                                <Card.Text>Rs. {item.price}</Card.Text>
                                <Link to={`/itemdescription/${item.key}/${qty}`}>View Item</Link>
                                <Button className='ms-3' variant="light" onClick={() => cartHandler(item.key, item.image_link, item.title, item.description, item.price)}>Add to Cart</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Footer></Footer>
        </div>
    )
}
export default Welcome;