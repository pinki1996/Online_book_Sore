import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import BookCart from './BookCart'
import axios from 'axios'

function Dashboard(){

  const url = "http://localhost:5000/displayBooks/"
  const [books,setBooks] = useState([]);
    const location = useLocation()
    async function getAllBooks(){
      await axios.get(url)
      .then(function(output)
      { 
        setBooks(output.data)
      })
      .catch(function(error)
      {
        console.log(error)
      })
      }
    useEffect(()=>{
      getAllBooks()
    },[])

  return (
    <div>
      <div className='max-w-7xl mx-auto flex flex-wrap justify-between'>
        {books.map((book)=>{
          return(
            <BookCart key={book.bookId} book={book}/>
          )
        })}
      </div>
       </div>
  )
}
export default Dashboard