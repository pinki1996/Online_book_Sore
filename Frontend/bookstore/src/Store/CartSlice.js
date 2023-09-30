 import { createSlice } from '@reduxjs/toolkit';

 const initialState = {
    cartItems:localStorage.getItem("cartItems") ? 
    JSON.parse(localStorage.getItem("cartItems")) : [],

    cartTotalQuantity: JSON.parse(localStorage.getItem("cartItems"))?.reduce((accumulator, object) => {
        return accumulator + object.cartQuantity;
      }, 0),

    cartTotalAmount: JSON.parse(localStorage.getItem("cartItems"))?.reduce((accumulator, object) => {
        return accumulator + object.cartQuantity * object.bookPrice;
      }, 0),

 }

 const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart(state,action){
            const itemIndex = state.cartItems.findIndex(item => item.bookId === action.payload.bookId);
            if(itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1
            }else{
                 const tempBook = {...action.payload, cartQuantity:1}
                state.cartItems.push(tempBook)
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
           
        },
        
        removeFromCart(state,action){
          const nextCartItems = state.cartItems.filter(
            cartItems => cartItems.bookId !== action.payload.bookId
          )
           state.cartItems = nextCartItems;
           localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        decreaseCart(state, action){
            const itemIndex = state.cartItems.findIndex(item => item.bookId === action.payload.bookId);
           
            if(state.cartItems[itemIndex].cartQuantity > 1){
                state.cartItems[itemIndex].cartQuantity -= 1
            }
            else if(state.cartItems[itemIndex].cartQuantity === 1){
                const nextCartItems = state.cartItems.filter(
                cartItems => cartItems.bookId !== action.payload.bookId)
                state.cartItems = nextCartItems
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        } 
    }
 })

 export const { addToCart, removeFromCart, decreaseCart } = cartSlice.actions;

 export default cartSlice.reducer ;