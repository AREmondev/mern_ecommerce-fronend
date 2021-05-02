import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../FormContainer/FormContainer'
import { createOrder } from '../../action/orderAction'
import CheckOutSteps from '../CheckOutSteps/CheckOutSteps'
function PlaceOrder() {
  const history = useHistory()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  //   const [address, setAddress] = useState(shippingAddress.address)
  //   const [city, setCity] = useState(shippingAddress.city)
  //   const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  //   const [country, setCountry] = useState(shippingAddress.country)

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  )
  cart.shippingPrice = cart.itemsPrice > 5000 ? 0 : 45
  cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(0))
  cart.totalPrice = (
    cart.itemsPrice +
    cart.shippingPrice +
    cart.taxPrice
  ).toFixed(2)
  const placeOrderHandler = () => {
    try {
      dispatch(
        createOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          taxPrice: cart.taxPrice,
          shippingPrice: cart.shippingPrice,
          totalPrice: cart.totalPrice,
        }),
      )
    } catch (error) {
      console.log('somossa', error)
    }
    // dispatch(saveShippingAddress({ address, city, postalCode, country }))
    // history.push('/payment')
  }
  return (
    <div style={{ padding: '10px 0 60px 0' }} className="place-order">
      <FormContainer>
        <CheckOutSteps step1 step2 step3 step4 />
      </FormContainer>
      <Container>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  Address:{' '}
                  <strong>
                    {shippingAddress.address}, {shippingAddress.city},{' '}
                    {shippingAddress.postalCode}, {shippingAddress.country}
                  </strong>
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <strong>Method: {cart.paymentMethod}</strong>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Items</h2>
                {cart.cartItems.length === 0 ? (
                  <p>Cart Item Empty</p>
                ) : (
                  <ListGroup variant="flush">
                    {cart.cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={2}>
                            <Image src={item.image} alt={item.name} />
                          </Col>
                          <Col md={6}>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x {item.price} = $
                            {(item.qty * item.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Order Summery</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>{cart.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>{cart.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>{cart.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>{cart.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button onClick={placeOrderHandler} block>
                    Place Order
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default PlaceOrder
