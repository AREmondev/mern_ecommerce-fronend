import React, { useEffect, useState } from 'react'
import './ProductDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import Rating from '../Rating/Rating'
import { Link, useHistory, useParams } from 'react-router-dom'
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
import { ListProductDetails } from '../../../action/productAction'
import Loading from '../../Loading/Loading'
function ProductDetails() {
  const { id } = useParams()
  const history = useHistory()

  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  useEffect(() => {
    dispatch(ListProductDetails(id))
  }, [dispatch, id])
  const { loading, product, error } = productDetails

  const { name, price, image, rating, reviewCount, descriptions } = product

  const [qty, setQty] = useState(1)
  const handleCartSubmite = () => {
    history.push(`/cart/${id}?qty=${qty}`)
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <h2>Error..</h2>
      ) : (
        <div className="py-5">
          <Container>
            <Link to="/" className="btn btn-light my-3">
              Go Back
            </Link>
            <Row>
              <Col md={6}>
                <Image src={image} />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating value={rating} text={reviewCount}></Rating>
                  </ListGroup.Item>
                  <ListGroup.Item>$ {price}</ListGroup.Item>
                  <ListGroup.Item>{descriptions}</ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col> Price:</Col>
                        <Col>
                          <strong> $ {price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col> Status:</Col>
                        <Col>
                          <strong>
                            {product.countInStock > 0
                              ? 'In Stock'
                              : 'out Of Stock'}
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option value={x + 1} key={x + 1}>
                                    {x + 1}
                                  </option>
                                ),
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                      <Button
                        disabled={product.countInStock > 0 ? false : true}
                        onClick={handleCartSubmite}
                        className="btn-block"
                      >
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  )
}

export default ProductDetails
