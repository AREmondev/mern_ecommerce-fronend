import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function CheckOutSteps({ step1, step2, step3, step4 }) {
  return (
    <Nav className="justify-content-between mb-4">
      <Nav.Item>
        {step1 ? (
          <Link to="/login">Log In</Link>
        ) : (
          <Link className="disabled-step" disabled>
            Log In
          </Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <Link to="/shipping">Shipping</Link>
        ) : (
          <Link className="disabled-step" disabled>
            Shipping
          </Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <Link to="/payment">Payment</Link>
        ) : (
          <Link className="disabled-step" disabled>
            Payment
          </Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <Link to="/placeorder">Place Order</Link>
        ) : (
          <Link className="disabled-step" disabled>
            Place Order
          </Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckOutSteps
