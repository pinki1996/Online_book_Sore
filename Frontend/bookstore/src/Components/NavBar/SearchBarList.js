import React from 'react'

const SearchBarList = ({ results }) => {
  return (
    <>
        <div className='absolute lg:items-center m-2 mx-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 "  aria-orientation="vertical" aria-labelledby="search" '>
        {
            results.map((results, id)=>{
                return   <a href = {`/book/${results.bookId}`} className="text-gray-700 block px-4 py-2 text-sm">
                             {results.bookName}</a>
                        
            })
        }
        </div>
    </>
  )
}

export default SearchBarList