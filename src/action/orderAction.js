import axios from 'axios'
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  USER_ORDER_REQUEST,
  USER_ORDER_SUCCESS,
  USER_ORDER_FAIL,
  USER_ORDER_Pay_REQUEST,
  USER_ORDER_Pay_SUCCESS,
  USER_ORDER_Pay_FAIL,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_FAIL,
} from '../constants/orderConstants'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST })
    const {
      userLogIn: { userInfo },
    } = getState()
    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      'https://mern-ecommence.herokuapp.com/api/order',
      order,
      config,
    )

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error })
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST })
    const {
      userLogIn: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `https://mern-ecommence.herokuapp.com/api/order/${id}`,
      config,
    )

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error })
  }
}
export const getUserOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_ORDER_REQUEST })
    const {
      userLogIn: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(
      `https://mern-ecommence.herokuapp.com/api/order/userorder`,
      config,
    )

    dispatch({ type: USER_ORDER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: USER_ORDER_FAIL, payload: error })
  }
}

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_ORDER_Pay_REQUEST })
    const {
      userLogIn: { userInfo },
    } = getState()
    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(
      `https://mern-ecommence.herokuapp.com/api/order/${id}/pay`,
      paymentResult,
      config,
    )
    dispatch({ type: USER_ORDER_Pay_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: USER_ORDER_Pay_FAIL, payload: error })
  }
}
export const cancelOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CANCEL_ORDER_REQUEST })
    const {
      userLogIn: { userInfo },
    } = getState()
    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.delete(
      `https://mern-ecommence.herokuapp.com/api/order/${id}`,
      config,
    )

    dispatch({ type: CANCEL_ORDER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: CANCEL_ORDER_FAIL, payload: error })
  }
}
