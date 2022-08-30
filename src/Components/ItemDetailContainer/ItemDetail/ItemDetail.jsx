
import { useState } from 'react';
import {Link} from 'react-router-dom'
import { useCartContext } from '../../Context/CartContext';
import ItemCount from '../../ItemCount/ItemCount'
import './ItemDetail.css';


const ItemDetail = ({product}) => {

  const {addCart, cartList} = useCartContext()

  const [cart, setCart] = useState(true)

  //declaro la constante onAdd para incoporar el producto y la cantidad seleccionada al carrito
  const onAdd =(cant)=> {    
    setCart(false)
    addCart({...product, amount: cant})
  }


  return (
    <>
       <div  id="box">
                <div className="card" id="card" >
                     <img className="card-img-top" src={product.image} alt="Card image cap"/>
                         <div className="card-body text">
                            <p className="card-text text">Modelo: {product.name}</p>
                            <p className="card-text text">Detalle: {product.detail}</p>
                            <p className="card-text text">Precio: $ {product.price} </p>
                            {cart ?  
                            <ItemCount initial={1} stock={20} onAdd={onAdd}/>
                              :
                            <>
                            <Link to='/cart'><button className="btn btn-primary text"> Finalizar Compra</button></Link>
                            <Link to='/'><button className="btn btn-primary text"> Seguir comprando</button></Link>
                            </>
                          }
                        </div> 
                </div> 
             </div>
    </>   
    )
}

export default ItemDetail

