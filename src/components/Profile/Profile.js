import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { cancelOrder, getUserOrder } from '../../action/orderAction.js'
import {
  userDetailsAction,
  updateUserProfile,
} from '../../action/userAction.js'
import { USER_ORDER_RESET } from '../../constants/orderConstants.js'
function Profile() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const history = useHistory()
  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails)
  const userLogIn = useSelector((state) => state.userLogIn)
  const userOrders = useSelector((state) => state.userOrders)

  const { loading, order, success } = userOrders

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
    dispatch(getUserOrder())
  }, [history, dispatch, userInfo, user])

  const handelProfile = (e) => {
    e.preventDefault()
    if (password === confirmPassword) {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }
  const orderDetailsHandler = (id) => {
    history.push(`/order/${id}`)
  }
  const cancelOrderHandler = (id) => {
    dispatch(cancelOrder(id))

    dispatch(getUserOrder())
    dispatch({ type: USER_ORDER_RESET })
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
          <Col md={8}>
            <h2>My Order</h2>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <th>Id</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Deliver</th>
                <th>Details</th>
              </thead>
              {!loading && success ? (
                order.map((ordr) => (
                  <tr key={ordr._id}>
                    <td>{ordr._id}</td>
                    <td>{ordr.totalPrice}</td>
                    <td>
                      {!ordr.isPaid ? (
                        <h5 style={{ color: 'red' }}>No</h5>
                      ) : (
                        <h5 style={{ color: 'green' }}>Yes</h5>
                      )}
                    </td>

                    <td>
                      {!ordr.isDelivered ? (
                        <h5 style={{ color: 'red' }}>No</h5>
                      ) : (
                        <h5 style={{ color: 'green' }}>Yes</h5>
                      )}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <Button
                        style={{ margin: '0 5px' }}
                        onClick={() => orderDetailsHandler(ordr._id)}
                      >
                        <i class="fas fa-info-circle"></i>
                      </Button>
                      <Button
                        variant="danger"
                        style={{ margin: '0 5px' }}
                        onClick={() => cancelOrderHandler(ordr._id)}
                      >
                        <i class="far fa-window-close"></i>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>No Data</tr>
              )}
              <tbody></tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Profile
