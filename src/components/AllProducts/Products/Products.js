import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row } from 'react-bootstrap'
import './Products.css'
import SingleProduct from '../SingleProduct/SingleProduct'
import { ListProducts } from '../../../action/productAction'
import Loading from '../../Loading/Loading'
// import {ListProducts}

function Products() {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  useEffect(() => {
    dispatch(ListProducts())
  }, [dispatch])
  const { loading, products, error } = productList

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <h2>Error..</h2>
      ) : (
        <Row>
          {products.map((product) => (
            <SingleProduct key={product._id} product={product} />
          ))}
        </Row>
      )}
    </>
  )
}

export default Products
