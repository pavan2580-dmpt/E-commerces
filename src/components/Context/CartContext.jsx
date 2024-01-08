import React, { useState } from 'react'
import cartcontext from './CartContext'

function CartContext({children}) {
  const[CartCtn,SetCartCtn] = useState(0);
  return (
    <cartcontext.Provider value={[CartCtn,SetCartCtn]}>
      {children}
    </cartcontext.Provider>
  )
}

export default CartContext