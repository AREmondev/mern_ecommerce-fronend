import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './Header.css'
import { logOut } from '../../action/userAction'
function Header() {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogin
  const handleLogOut = () => {
    dispatch(logOut())
  }
  return (
    <Navbar id="navbar" expand="lg">
      <Container>
        <NavLink className="logo" to="/">
          ProShop
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="ml-auto" id="basic-navbar-nav">
          <Nav className="ml-auto d-flex align-items-center">
            <NavLink className="menu-item" to="/">
              Home
            </NavLink>
            <NavLink className="menu-item" to="/cart">
              Cart
            </NavLink>
            {userInfo || (userInfo && userInfo.length > 0) ? (
              <NavDropdown
                className="ml-3 dropdown"
                title={userInfo.name}
                id="username"
              >
                <Link to="/profile">
                  <NavDropdown.Item href="/">Profile</NavDropdown.Item>
                </Link>

                <NavDropdown.Item onClick={handleLogOut}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavLink className="menu-item" to="/login">
                LogIn
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
