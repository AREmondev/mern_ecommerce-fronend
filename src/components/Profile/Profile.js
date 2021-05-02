import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  userDetailsAction,
  updateUserProfile,
} from '../../action/userAction.js'
function Profile() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const history = useHistory()
  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails)
  const userLogIn = useSelector((state) => state.userLogIn)

  const { user } = userDetails
  const { userInfo } = userLogIn
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(userDetailsAction('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [history, dispatch, userInfo, user])

  const handelProfile = (e) => {
    e.preventDefault()
    if (password === confirmPassword) {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return (
    <div style={{ padding: '60px 0' }} className="profile-area">
      <Container>
        <h1>Update Profile</h1>

        <Row>
          <Col md={4}>
            <Form onSubmit={handelProfile}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
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
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary">
                Update Profile
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Profile
