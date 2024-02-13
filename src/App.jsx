import React, { useState } from 'react'
import NavBar from "./components/Navigation(navBar)/NavBar.jsx"
import Footer from "./components/Footer/Footer.jsx"
import {BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./components/Home/Home.jsx"
import Register from "./components/Auth/Register/Register.jsx"
import Login from "./components/Auth/Login/Login.jsx"
import About from "./components/About/About.jsx"
import Contact from "./components/ContactUs/ContactUs.jsx"
import Account from "./components/Account/Account.jsx"
import Cart from './components/Cart/Cart.jsx'
import WishList from './components/Wishlist/WishList.jsx'
import Error from "./components/Error/Error.jsx"
import CheckOut from "./components/CheckOut/CkeckOut.jsx"
import ProductDetails from './components/ProductDetails/ProductDetails.jsx'
import Searched from "./components/SearchedProducts/Searched.jsx"
import CartContext from './components/Context/CartContext.jsx'
import Categoreis from './components/Categories/Categoreis.jsx'
import MyOrders from './components/MyOrders/MyOrders.jsx'




function App() {
  const [CartCount,SetCartCount]  = useState(0);
  return (
    <CartContext>
      <BrowserRouter>
          <Routes>
         
                <Route path='/' element={<NavBar/>}>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/signup' element={<Register/>}/>
                    <Route path='/signin' element={<Login/>}/>
                    <Route path='/about' element={<About/>}/>
                    <Route path='/account' element={<Account/>}/>
                    <Route path='/contact' element={<Contact/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/wishlist' element={<WishList/>}/>
                    <Route path='/checkout' element={<CheckOut/>}/>
                    <Route path='/productdetails/:id' element={<ProductDetails/>}/>
                    <Route path='/search' element={<Searched/>}/>
                    <Route path='/Categories/:id' element={<Categoreis />} />
                    <Route path='/myOrders' element={<MyOrders/>}/>

                    <Route path='*' element={<Error/>}/>
                </Route>
               
           </Routes>
         
      <Footer/> 

    </BrowserRouter>
    </CartContext>
  )
}

export default App
