import React, {  useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import Search from './Search'
import SearchBarList from './SearchBarList'

const NavBar = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [results, setResults] =  useState([])

    const handleLogout = ()=>{
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <>
        <nav className="flex flex-wrap py-2 lg:px-12 bg-blue shadow border-solid border-t-2 ">
           <div className="menu w-full lg:block flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
                <div className="flex flex-col text-gray-800 mr-16">
                    <span className="font-semibold text-xl tracking-tight"><a href={'/home'}>Online Book Store</a></span>
                </div>
                

                <div className="menu w-full lg:block flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8 " id="search">
                <Search setResults={setResults}/>
                </div>
                <div class="relative inline-block text-left ">
                    
                    <button type="submit" className="absolute right-0 top-0 mt-3 mr-2"></button>
                        <a href={'/cart'}><i className=" text-2xl px-5 fa">&#xf290;</i></a>
                        <button type="button" class="  px-2 text-lg font-semibold text-gray-900" id="menu-button" aria-expanded="true" aria-haspopup="true" 
                            onClick={() => setIsOpen((prev) => !prev)}>Profile 
                            {!isOpen ? <i className="text-xl px-1 fa fa-caret-down"></i> : <i className="text-xl px-1 fa fa-caret-up"></i>}
                        </button>

                        {
                            isOpen ?
                                <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-black " role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                    <div class="py-1" role="none">
                                        <a href={'edit'}  className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Edit</a>
                                        <a onClick={handleLogout} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">Logout</a>

                                    </div>
                                </div>
                                : null
                        }

                 
                </div>
            </div>
        </nav>
        
        <SearchBarList results ={results}/>
        </>
    )
}

export default NavBar