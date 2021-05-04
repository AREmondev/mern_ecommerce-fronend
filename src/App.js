import './App.css'
import Header from './components/Header/Header'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import ProductDetails from './components/AllProducts/ProductDetails/ProductDetails'
import store from './store/store'
import { Provider } from 'react-redux'
import Cart from './components/Cart/Cart'
import LogIn from './components/LogIn/LogIn'
import SignUp from './components/SignUp/SignUp'
import Profile from './components/Profile/Profile'
import Shipping from './components/Shipping/Shipping'
import Payment from './components/Payment/Payment'
import PlaceOrder from './components/PlaceOrder/PlaceOrder'
import Order from './components/Order/Order'
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/product/:id">
            <ProductDetails />
          </Route>
          <Route path="/cart/:id?">
            <Cart />
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/shipping">
            <Shipping />
          </Route>
          <Route path="/payment">
            <Payment />
          </Route>
          <Route path="/placeorder">
            <PlaceOrder />
          </Route>
          <Route path="/order/:id">
            <Order />
          </Route>
        </Switch>

        <Footer />
      </Router>
    </Provider>
  )
}

export default App
