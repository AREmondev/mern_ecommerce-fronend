import React from 'react'
import { Container } from 'react-bootstrap'
import Products from '../AllProducts/Products/Products'
import './Home.css'
function Home() {
  return (
    <div className="home-area">
      <Container>
        <h3>Featured Products</h3>

        <Products />
      </Container>
    </div>
  )
}

export default Home
