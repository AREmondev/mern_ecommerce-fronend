import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { Card, Col, Container, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, payOrder } from '../../action/orderAction'
import { PayPalButton } from 'react-paypal-button-v2'
import { USER_ORDER_Pay_RESET } from '../../constants/orderConstants'

function Order() {
  const history = useHistory()
  const { id } = useParams()

  const dispatch = useDispatch()
  const orderDetails = useSelector((state) => state.orderDetails)
  const orderPay = useSelector((state) => state.orderPay)
  const userLogin = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogin
  const [sdkReady, setSdkReady] = useState(false)
  const { loading, order, error } = orderDetails
  const { loading: loadingPay, success: successPay } = orderPay

  if (!loading) {
    if (userInfo && userInfo._id === (order ? order.user._id : null)) {
      if (order.orderItems.length > 0) {
        order.itemsPrice = order.orderItems.reduce(
          (acc, item) => acc + item.price * item.qty,
          0,
        )
      }
    }
  }

  useEffect(() => {
    const addPayPayScripts = async () => {
      const { data: clientId } = await axios.get(
        'https://mern-ecommence.herokuapp.com/api/config/paypal',
      )

      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      // script.onload = () => {

      // }
      script.addEventListener('load', function () {
        setSdkReady(true)
      })
      document.body.appendChild(script)
    }

    if (!order || successPay) {
      dispatch({ type: USER_ORDER_Pay_RESET })
      dispatch(getOrderDetails(id))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPayScripts()
      } else {
        setSdkReady(true)
      }
    }
    if (!userInfo) {
      history.push('/login')
    }
  }, [userInfo, order, id, dispatch, successPay, history])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult))
  }

  return loading ? (
    <>Loading</>
  ) : error ? (
    <>Error...</>
  ) : userInfo && userInfo._id === (order ? order.user._id : null) ? (
    <div style={{ padding: '10px 0 60px 0' }} className="place-order">
      <Container>
        <h2 style={{ margin: '30px 0' }}>
          <strong>ORDER {id}</strong>{' '}
        </h2>

        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>Shipping</h3>
                <p>
                  <strong>Name: </strong>
                  {order.user.name}
                </p>
                <p>
                  <strong>Email: </strong>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p>
                  <strong>
                    Address: {order.shippingAddress.address},{' '}
                    {order.shippingAddress.city},{' '}
                    {order.shippingAddress.postalCode},{' '}
                    {order.shippingAddress.country}
                  </strong>
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <strong>Method: {order.paymentMethod}</strong>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <p>Cart Item Empty</p>
                ) : (
                  <ListGroup variant="flush">
                    {order.orderItems.map((item, index) => (
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
                    <Col>{order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>{order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>{order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>{order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <>Loading</>}
                    {!sdkReady ? (
                      <>Loading2</>
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  ) : (
    <>This Is Not Your Order</>
  )
}

export default Order
