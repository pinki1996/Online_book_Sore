import React, { useState } from 'react'

const Search = ({ setResults }) => {
    const [input, setInput] = useState('')

    const url = "http://localhost:5000/displayBooks/"

    const fetchData = (value) => {
        fetch(url).then((response) => response.json())
            .then(json => {
                const results = json.filter((displayBook) => {
                    return value && displayBook && displayBook.bookName && displayBook.bookName.toLowerCase().includes(value)
                })
                setResults(results)
            })
    }

    const handlechange = (value) => {
        setInput(value)
        fetchData(value)
    }
    return (
        <>
            <input
                className=" border-2 w-full border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none"
                type="search" value={input} onChange={(e) => handlechange(e.target.value)} name="search" placeholder="Search" />

        </>
    )
}

export default Search