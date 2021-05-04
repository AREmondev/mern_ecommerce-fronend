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
  USER_ORDER_Pay_RESET,
  ORDER_CREATE_RESET,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_FAIL,
  USER_ORDER_RESET,
  ORDER_DETAILS_RESET,
} from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload }

    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_CREATE_RESET:
      return {}

    default:
      return state
  }
}
export const getOrderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action,
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true }

    case ORDER_DETAILS_SUCCESS:
      return { loading: false, success: true, order: action.payload }

    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_DETAILS_RESET:
      return {}
    default:
      return state
  }
}
export const cancelOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CANCEL_ORDER_REQUEST:
      return { loading: true }

    case CANCEL_ORDER_SUCCESS:
      return { loading: false, success: true }

    case CANCEL_ORDER_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
export const getUserOrderReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_ORDER_REQUEST:
      return { loading: true }

    case USER_ORDER_SUCCESS:
      return { loading: false, success: true, order: action.payload }

    case USER_ORDER_FAIL:
      return { loading: false, error: action.payload }
    case USER_ORDER_RESET: {
    }
    default:
      return state
  }
}
export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ORDER_Pay_REQUEST:
      return { loading: true }

    case USER_ORDER_Pay_SUCCESS:
      return { loading: false, success: true }

    case USER_ORDER_Pay_FAIL:
      return { loading: false, error: action.payload }
    case USER_ORDER_Pay_RESET:
      return {}

    default:
      return state
  }
}
