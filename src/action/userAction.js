import axios from 'axios'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
} from '../constants/userConstants.js'

export const logIn = (email, password, redirectAuth, from) => async (
  dispatch,
) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })
    const config = { headers: { 'content-type': 'application/json' } }
    const { data } = await axios.post(
      'https://mern-ecommence.herokuapp.com/api/users/login',
      { email, password },
      config,
    )
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
    redirectAuth(from)
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error })
  }
}
export const logOut = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGOUT })
    localStorage.removeItem('userInfo')
  } catch (error) {}
}

export const register = (name, email, password, redirectAuth, from) => async (
  dispatch,
) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST })
    const config = { headers: { 'content-type': 'application/json' } }
    const { data } = await axios.post(
      'https://mern-ecommence.herokuapp.com/api/users/signup',
      { name, email, password },
      config,
    )

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data })

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data }, redirectAuth(from))
    redirectAuth(from)
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error })
  }
}

export const userDetailsAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST })
    const {
      userLogIn: { userInfo },
    } = getState()
    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(
      `https://mern-ecommence.herokuapp.com/api/users/${id}`,
      config,
    )
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error })
  }
}
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST })
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
      `https://mern-ecommence.herokuapp.com/api/users/profile`,
      user,
      config,
    )
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: error })
  }
}
