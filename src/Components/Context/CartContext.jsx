

import {createContext,  useState, useContext} from 'react'

export const CartContext = createContext ([])

export const useCartContext = () => useContext(CartContext)

const CartContextProvider = ({children}) => {

const [cartList, setCartList] = useState ([])


//analizo si ya tengo ese producto en el carrito y le aumento la cantidad al total a comprar o incorporo un nuevo producto seleecionado
const addCart = (prod) => {
    const index = cartList.findIndex(item => item.id === prod.id)
    if(index !== -1){
        let cant = cartList[index].amount
        cartList[index].amount += cant + prod.amount 
        setCartList([...cartList])
    } else {
    setCartList([
        ...cartList,
        prod
    ])}
}

//para vaciar el carrito
const emptyCart = () => {
    setCartList([])

}

//calcular el precio total de lo seleccionado
const totalPrice = () =>{
    return cartList.reduce((accumPrice, prodObj) => accumPrice = accumPrice + (prodObj.price * prodObj.amount), 0)
   
}


//calcular la cantidad total de productos seleccionados
const totalQuantity = () =>{
    return cartList.reduce ((counter, produObject) => counter += produObject.amount, 0)
}

//me permite eliminar un producto del carrito de compras
const removeProduct = (id)=>{
    setCartList(cartList.filter(prod => prod.id !== id))

 }
return (
    <CartContext.Provider value = {{
        cartList,
        addCart ,
        emptyCart,
        totalPrice,
        totalQuantity,
        removeProduct
  
    }}>
        {children}
    </CartContext.Provider>

)
}

export default CartContextProvider