import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../FormContainer/FormContainer'
import { savePaymentMethods } from '../../action/cartAction'
import CheckOutSteps from '../CheckOutSteps/CheckOutSteps'
function Payment() {
  const history = useHistory()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  console.log(shippingAddress)
  useEffect(() => {
    if (shippingAddress.address === '') {
      history.push('/shipping')
    }
  }, [shippingAddress, history])
  const [paymentMethods, setPaymentMethods] = useState('PayPal')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethods(paymentMethods))
    history.push('/placeorder')
  }
  return (
    <FormContainer className="payment-area py-5">
      <CheckOutSteps step1 step2 step3 />
      <h1>Payment Methode</h1>
      <Form className="py-3" onSubmit={submitHandler}>
        <Row>
          <Col md={12}>
            <Form.Group>
              <Form.Label as="legend">Select Method</Form.Label>
            </Form.Group>
          </Col>
          <Col>
            <input
              className="mr-2"
              checked="checked"
              type="radio"
              name="paymentMethods"
              id="PayPal"
            />
            <label htmlFor="PayPal">PayPal</label>
          </Col>
        </Row>
        <Button className="mt-3" type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Payment
