import React, { useEffect } from 'react'
import './Cart.css'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../action/cartAction'
import { Link, useLocation, useParams, useHistory } from 'react-router-dom'
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

function useQuery() {
  return new URLSearchParams(useLocation().search)
}
function Cart() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { id } = useParams()
  const productId = id
  const query = useQuery()
  const qty = +query.get('qty')
  console.log(id, qty)
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  console.log(cartItems)
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId))
  }
  const handleCheckOutSubmit = () => {
    history.push('/payment')
  }
  return (
    <div className="cart-area">
      <Container>
        <Row>
          <Col md={8}>
            <h2 style={{ marginBottom: '22px' }}>Shopping Chart</h2>
            {cartItems.length === 0 ? (
              <h1>Chart Empty</h1>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>${item.price}</Col>
                      <Col md={3}>
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value)),
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option value={x + 1} key={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items
                  </h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h6>
                    Subtotal Price{' '}
                    <strong>
                      {' '}
                      {' $'}
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </strong>
                  </h6>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    disabled={cartItems.length === 0}
                    onClick={handleCheckOutSubmit}
                    className="btn-block"
                  >
                    Check Out
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

export default Cart
