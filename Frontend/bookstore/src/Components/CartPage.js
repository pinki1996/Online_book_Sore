import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decreaseCart, removeFromCart } from '../Store/CartSlice'

const CartPage = () => {
  const dispatch = useDispatch()

  function removeBookFromCart(props) {  
    dispatch(removeFromCart(props))
  }

  function addBookFromCart(props) {
    dispatch(addToCart(props))
  }

  function decreaseFromCart(props) {
    dispatch(decreaseCart(props))
  }

  const cart = useSelector(state => state.cart)
 

  return (
    <div className='max-w-6xl mx-auto flex flex-wrap justify-between'>
      <div className="w-full relative ">
        <h3 className="mb-6 text-2xl font-extrabold leading-none tracking-tight text-gray-900 py-5 lg:text-center dark:text-white">
          Book Cart</h3>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Book name
              </th>
              <th scope="col" className="px-6 py-3">
                Book Image
              </th>
              <th scope="col" className="px-6 py-3">
                Author
              </th>
              <th scope="col" className="px-6 py-3">
              Quantity
              </th>
            
              <th scope="col" className="px-6 py-3">
              Price
              </th>
              <th scope="col" className="px-6 py-3">
              Remove Book
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.cartItems?.map((cartItems) => {
              return (
                <tr className="bg-white border-b dark:bg-black-800 dark:border-black-800">
                  <td className="px-6 py-4">{cartItems.bookName}</td>
                  <td className="px-6 py-4"><img height="50rem" width="100rem" src={(`http://localhost:5000/uploads/${cartItems.bookImage}`)} /></td>
                  <td className="px-6 py-4">{cartItems.bookAuthor}</td>
                  <td className="px-6 py-4 ">
                    <a type="submit" onClick={() => addBookFromCart(cartItems)} className="outline outline-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                      +   
                    </a> 
                    <a type="submit" className=' outline outline-1 bg-gray-300 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4'>{cartItems.cartQuantity}</a>
                    <a type="submit" onClick={() => decreaseFromCart(cartItems)} className=" outline outline-1  bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                      -
                    </a>
                  </td>
                  <td className="px-6 py-4">$ {cartItems.bookPrice}</td>  
                  <td className="px-6 py-4">
                    <a type="submit" onClick={() => removeBookFromCart(cartItems)}>Remove</a>
                  </td>
                  
                </tr>
              )
            })
            }
          </tbody>
        </table>
        <div className='flex flex-wrap justify-end'>
          <p>Subtotal ({cart.cartTotalQuantity} Items)<span> $ {cart.cartTotalAmount}</span></p>
        </div>
        <a href='/customer' className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Continue & Make Payment</a>
      </div>

    </div>

  )
}

export default CartPage