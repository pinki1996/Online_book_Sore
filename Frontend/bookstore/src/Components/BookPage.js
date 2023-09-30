import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import BookDetails from './BookDetails';

const BookPage = () => {
    let { id } = useParams();
    const [books,setBooks] = useState([]);

    const url = "http://localhost:5000/displayBooks/"
    
  
      async function getAllBooks(){
        await axios.post(url + id, id)
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
    <div className="max-w-7xl mx-auto pt-16">
      <BookDetails book={books} />
    </div>
  )
}

export default BookPage

