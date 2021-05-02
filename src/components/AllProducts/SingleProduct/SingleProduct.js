import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../Rating/Rating'

function SingleProduct({ product }) {
  const { name, price, image, _id, rating, reviewCount } = product

  return (
    <Col sm={6} md={4}>
      <Card className="my-3 p-3">
        <Link to={`product/${_id}`}>
          <img src={image} alt="Product" />
        </Link>
        <Card.Body>
          <Link style={{ color: '#050505' }} to={`product/${_id}`}>
            <Card.Title style={{ fontSize: '27px', fontWeight: 700 }}>
              {name}
            </Card.Title>
          </Link>

          <Card.Text as="div">
            <div className="my-3">
              <Rating value={rating} text={reviewCount} />
            </div>
          </Card.Text>
          <Card.Text as="h3">$ {price}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default SingleProduct
