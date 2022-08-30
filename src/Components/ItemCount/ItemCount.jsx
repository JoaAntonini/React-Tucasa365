
import {useState} from 'react'
import './ItemCount.css';

const ItemCount = ({initial=1, stock=20, onAdd}) => {
    
    const [count, setCount] = useState(initial);

    //defino las constantes para aumentar y disminuir la cantidad seleccionada y luego, agregarla al carrito solo si la cantidad seleccionada es menor que el stock disponible.
  
    const handlePlus = () => {
      if (count < stock) {
      setCount(count + 1)
      }
    }

    const handleLess = () => {
      if (count > initial) {
      setCount(count - 1)
      }
   }

   const handleAddToCart = () => {
    if (count < stock) {
      onAdd(count)
    }
 }

  
    return (
      <>
           <div className="card-body selectorSize">
              <button onClick={handleLess} className=" btn btn-dark margin"> -</button>
              { count}
              <button onClick={handlePlus} className=" btn btn-dark margin"> +</button>
            </div>  
            <div className="card-body selectorSize">
            <button id="addCart" className="btn btn-secondary" onClick={handleAddToCart}>Agregar al Carrito</button>
            </div>
    
      </>
    );
  
}

export default ItemCount