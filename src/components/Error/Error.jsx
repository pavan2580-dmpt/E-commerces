import React from 'react'
import "./Error.css"
import { useNavigate } from 'react-router'
function Error() {
  const Navigate = useNavigate();

  return (
    <>
    <div className="error_page_container">
      <h1>404  Not Found</h1>
      <p>Your visited page not found. You may go home page.</p>
      <button onClick={()=>{Navigate('/')}}>Go Back To Home</button>
    </div>
    </>
  )
}

export default Error