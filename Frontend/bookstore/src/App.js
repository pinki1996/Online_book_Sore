
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { SignIn } from './Components/Profile/SignIn';
import { SignUp } from './Components/Profile/SignUp';
import Dashboard from './Components/Dashboard';
import CartPage from './Components/CartPage';
import BookPage from './Components/BookPage';
import BookCart from './Components/BookCart';
import ManageNavBar from './Components/NavBar/ManageNavBar';
import Customer from './Components/Payment/Customer';
import Profile from './Components/Profile/Profile';


function App() {
  
  return (
    <div >
      <>
      
        <Router>
         <ManageNavBar/>
          <Routes>
            <Route path="/" element={<SignIn />} ></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/home" element={<Dashboard />}></Route>
            <Route path='book/:id' element={<BookPage />}></Route>
            <Route path='/bookCart' element={<BookCart />}></Route>
            <Route path='/cart' element={<CartPage />}></Route>
            <Route path='edit' element={<Profile />}></Route>
            <Route path='/customer' element={<Customer />}></Route>
          </Routes>
        </Router>

      </>
    </div>
  );
}

export default App;
