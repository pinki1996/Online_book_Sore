import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const Customer = () => {
  const cart = useSelector(state => state.cart)
  const navigate = useNavigate()

  const [name, setName]=useState('')
  const [email, setEmail]=useState(localStorage.getItem('email'))
  const [date, setDate]=useState(new Date())
  const [city, setCity]=useState('')
  const [state, setState]=useState('')
  const [country, setCountry]=useState('')
  const [pinCode, setPinCode]=useState('')
  const [amount, setAmount]=useState(cart.cartTotalAmount)

  async function submit(e){
      e.preventDefault()

          await axios.post("http://localhost:5000/customer",{
              name, city, email, state, date, country, pinCode, amount
          })
          .then(function(output)
          { 
            setName(output.data)
            navigate('/home')
          })
          .catch(function(error)
          {
            console.log(error)
          })

      }

  return (
    <div>
      <div className='max-w-4xl mx-auto flex flex-wrap justify-between'>
      <div className="w-full relative ">
        <h3 className="mb-6 text-2xl font-extrabold leading-none tracking-tight text-gray-900 py-5 lg:text-center dark:text-white">
          Customer Details</h3>
        <form className='w-full outline outline-1 rounded font-bold py-2 px-4' action="Post" >
        <div class="w-full">
            <label className="px-6 py-3">Customer Name</label> 
            <input 
            className=" py-2 w-96 outline outline-1 rounded bg-grey border-b dark:bg-black-800 dark:border-black-800" 
            type="text" 
            name="name" 
            onChange={(e)=>{setName(e.target.value)}}
            id="name" required /><br/><br/>

            <label className="px-6 py-3">Customer Email</label> 
            <input 
            className=" py-2 w-96 outline outline-1 rounded bg-grey border-b dark:bg-black-800 dark:border-black-800" 
            type="email" 
            name="email" 
            value={localStorage.getItem('email')}
            onChange={(e)=>{setEmail(e.target.value)}}
            disabled /><br/><br/>

            <label className="px-6 py-2">Date</label>
            <input 
            className="py-2 w-96 outline outline-1 rounded bg-grey border-b dark:bg-black-800 dark:border-black-800" 
            type="date" 
            name="city" 
            onChange={(e)=>{setDate(e.target.value)}}
            id="city" required/><br/><br/>

            <label className="px-6 py-2">Customer City</label>
            <input 
            className="py-2 w-96 outline outline-1 rounded bg-grey border-b dark:bg-black-800 dark:border-black-800" 
            type="text" 
            name="city" 
            onChange={(e)=>{setCity(e.target.value)}}
            id="city" required/><br/><br/>

            <label className="px-6 py-3">Customer State</label>
            <input 
            className="py-2 w-96 outline outline-1 rounded bg-grey border-b dark:bg-black-800 dark:border-black-800" 
            type="text" 
            name="state" 
            onChange={(e)=>{setState(e.target.value)}}
            id="state" required/><br/><br/>

            <label className="px-6 py-3">Customer Country</label>
            <input 
            className="py-2 w-96 outline outline-1 rounded bg-grey border-b dark:bg-black-800 dark:border-black-800" 
            type="text" 
            name="country" 
            onChange={(e)=>{setCountry(e.target.value)}}
            id="country" required/><br/><br/>

            <label className="px-6 py-3">Customer Pincode</label>
            <input 
            className="py-2 w-96 outline outline-1 rounded bg-grey border-b dark:bg-black-800 dark:border-black-800" 
            type="number" 
            name="pincode" 
            onChange={(e)=>{setPinCode(e.target.value)}}
            id="pincode" required /><br/><br/>

            <label className="px-6 py-3">Total Amount</label>
            <input 
            value={cart.cartTotalAmount} 
            className="py-2 w-96 outline outline-1 rounded bg-grey border-b dark:bg-black-800 dark:border-black-800" 
            type="number" 
            name="amount" 
            onChange={(e)=>{setAmount(e.target.value)}}
            id="amount" disabled /><br/><br/>

            <div className='flex flex-wrap justify-between'>
              <button type="submit" onClick={submit} 
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' id="save">Save</button>
              <a href="https://buy.stripe.com/test_9AQfZE3H78qzbza3cc" className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' id="payment">Make Payment</a>
            </div>
          </div>
        </form>
      
      </div>

    </div>
    </div>
  )
}

export default Customer