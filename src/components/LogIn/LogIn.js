import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../FormContainer/FormContainer'
import { logIn } from '../../action/userAction.js'
function LogIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)

  const handelLogIn = (e) => {
    e.preventDefault()
    dispatch(logIn(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={handelLogIn}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Email"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Log In
        </Button>
      </Form>
      <p className="mt-3">
        Don't Have any account
        <Link to="/signup"> Sign Up</Link>
      </p>
    </FormContainer>
  )
}

export default LogIn
