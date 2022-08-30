
import { useCartContext } from '../Context/CartContext'
import {Link} from 'react-router-dom'
import { addDoc, collection, documentId, getDocs, getFirestore, query, where, writeBatch } from "firebase/firestore"
import { useState } from 'react';

import './Cart.css';

const Cart = () => {
const [ id, setId ] = useState('')

const [formData, setFormData] = useState({
  email:'', 
  name:'', 
  phone:'',
  rEmail:''
})

const {cartList, emptyCart, totalPrice, removeProduct} = useCartContext()


//funcion para guardar la orden y validar que los campos del formulario esten completos
const saveOrder = async (e) => {
  e.preventDefault()
  const order = {}//objeto vacio
  if (formData.email == ''|| formData.name ==  '' || formData.phone == '' || formData.rEmail  == '0' ) {
    alert('Deben completarse todos los campos')
  }
  if(formData.email !==  formData.rEmail) {
    alert('el correo ingresado no es el mismo')
  }
  else{ 
  order.buyer = formData
  order.products = cartList.map(prod => {
      return {
          product: prod.name,
          id: prod.id,
          price: prod.price
      }
  })
}
  order.total = totalPrice()

  //guardar orden en firebase
  const db = getFirestore() //conecta con firebase
  const queryOrders = collection(db, 'ordenes') //especifico que quiero guardar
  addDoc(queryOrders, order) //funcion para insertar , si no existe la coleccion la crea
  .then(resp => setId(resp.id))
  .catch(err => console.log(err))
  .finally(()=> setFormData({
        email:'', 
        name:'', 
        phone:'',
        rEmail:''
     })
    )

  // actualizar el stock 
  const queryCollectionStock = collection(db, 'Products') //apunta a la coleccion de productos

  //armo el filtro
  const queryUpdateStock = query( //genero una query para hacer un consula filtrada
      queryCollectionStock,      //mi coleccion       
       where( documentId() , 'in', cartList.map(it => it.id) )    //filtro en base a una condición    
   )
   

   //importo, permite hacer varias acciones a la vez
  const batch = writeBatch(db)

  //pide si o si un await para que sea una funcion asincronico porque debe hacer muchas consultas
   await getDocs(queryUpdateStock) //para traer varios docs
   .then(resp => resp.docs.forEach(res => batch.update(res.ref, {
       stock: res.data().stock - cartList.find(prod => prod.id === res.id).amount
   }) ))
   .catch(err => console.log(err))
  .finally(()=> {
    emptyCart()            
  })

  batch.commit()

}

const handleChanges = (e) => {
  setFormData({
      ...formData,
      [e.target.name]: e.target.value
  })
}




  return (
    <div>
      <div>
      {id.length >0 && <h2 className='idCart'>El codigo de tu orden es: ${id}</h2> }
      <h1 className='title'>Productos Seleccionados</h1>
        <div>
          {cartList.map(item => (
            <div className="texto purchaseFormat" key={item.id}>
              <img className="card-img-top image" src= {item.image} alt="Card image cap"/>
              <div  className="detailFormat">
                  <a className= "margen text">Nombre:{item.name} </a>
                  <a className= "margen text">Cantidad: {item.amount} </a>
                  <a className= "margen text">Costo: $ {item.price}      </a>  
                  <button className="btn btn-primary text" onClick={() => removeProduct(item.id)}> Eliminar</button> 
                </div>   
            </div>
          ))}
        </div>     
      </div>
      <div className="emptyCart">
          <h6 className='text'>{totalPrice() !== 0 ? `Total compra: $ ${totalPrice()}`: <Link to = '/'> <h4 className='text'> 0</h4><button  className="btn btn-dark  emptyCart" >Volver al inicio</button></Link> } </h6>
      </div>
      <div className="emptyCart">
      <h6 className='text'>{totalPrice() !== 0 ? <button  className="btn btn-light emptyCart" onClick={emptyCart}>Vaciar Carrito</button> : ``} </h6>
   
      </div>
<div className="detailFormat">

  <form  onSubmit={saveOrder} className="form" >   
    <label className='texto'>Formulario compra</label>
    <div className="form-group margin">
        <label htmlFor="exampleInputEmail1">Nombre</label>
        <input type="text" className="form-control input" name="name"  placeholder="Ingrese su nombre" onChange={handleChanges} value={formData.name}/>                       
      </div>
      <div className="form-group margin">
        <label htmlFor="exampleInputEmail1">Telefono</label>
        <input type="number" className="form-control input" name="phone" onChange={handleChanges}placeholder="Ingrese su teléfono"value={formData.phone}/>                        
    </div>
     <div className="form-group margin">
        <label htmlFor="exampleInputEmail1">Email</label>
        <input type="email" className="form-control input" name="email" onChange={handleChanges} placeholder="Ingrese su email"  value={formData.email} />        
    </div>
    <div className="form-group margin">
        <label htmlFor="exampleInputPassword1">Repetir Email</label>
        <input type="email" className="form-control input" name="rEmail" placeholder="Ingrese nuevamente su email" onChange={handleChanges}value={formData.rEmail}/>
    </div>
      {totalPrice() !== 0 ? <button type="submit" className="btn btn-primary input margin">Comprar</button>: ``}
  </form>

</div>    
</div>
  )
}

export default Cart
