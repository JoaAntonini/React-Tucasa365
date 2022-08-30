
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


import NavBar from './Components/NavBar/NavBar'
import ItemListContainer from './Components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './Components/ItemDetailContainer/ItemDetailContainer';
import Cart from './Components/Cart/Cart';
import CartContextProvider from './Components/Context/CartContext';

import './App.css';



function App() {

  return (   
    
    <BrowserRouter>
    <CartContextProvider>
      <NavBar/>
      <Routes>
        <Route path='/' element={<ItemListContainer/>}/>
        <Route path='/category/:categoryId' element={<ItemListContainer/>}/>
        <Route path='/detail/:detailId' element={<ItemDetailContainer/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
      </CartContextProvider>
    </BrowserRouter>   
   
   )
}

export default App
