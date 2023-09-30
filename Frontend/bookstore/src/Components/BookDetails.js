import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { addToCart } from '../Store/CartSlice'

const BookDetails = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function addBookToCart(props){
    dispatch(addToCart(props))
      navigate("/Cart")
  }
  
  return (
    
    <div className="flex">
      
        <div className="w-1/2">
          <img
            src={(`http://localhost:5000/uploads/${props.book.bookImage}`)}
            className="h-96"
            alt={props.book.bookName}
          />
        </div>
  
        <div className="w-1/2">
          <h1 className="text-3xl text-blue-700">{props.book.bookName}</h1>
          <p className="my-12">{props.book.bookDesc}</p>
          <div className="flex justify-between items-center">
            <h3 >By: <span className='text-blue-700'>{props.book.bookAuthor}</span></h3>
            <h3>Price: ${props.book.bookPrice}</h3>
            <button  onClick={()=>addBookToCart(props.book)} 
              className="bg-blue-600 text-white px-4 py-2 rounded-sm">
              Add To Cart
            </button>
          </div>
        </div>
      </div>    
  )
}

export default BookDetails