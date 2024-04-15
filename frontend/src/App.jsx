 import React, { useEffect, useState } from 'react'
 import axios from 'axios'

 function App() {

  const [image, setImage] = useState()
  const [amount, setAmount] = useState(500)

  async function handleQrCode() {
    const response = await axios.post('http://localhost:8080/qr-code', {amount})
    setImage(response.data.qrCodeImage)
  }

   return (
     <div>
        <img src="https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=600" style={{width: '200px'}} alt="" srcset="" />
        <p>{amount}</p>
        <button onClick={handleQrCode}>Purchase</button>
        <img src={image} alt="" />
     </div>
   )
 }
 
 export default App
 