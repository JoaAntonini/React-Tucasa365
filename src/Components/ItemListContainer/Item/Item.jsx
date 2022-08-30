

import  { memo } from 'react'
import {Link} from 'react-router-dom'
import './Item.css'

const Item = memo( ({product}) => {

  return (				
				   
               <div className="card" id="card" >
                <img className="card-img-top" src={product.image} alt="Card image cap"/>
                    <div className="card-body text">
                      <p className="card-text text">{product.name}</p>
                       <p className="card-text text">$ {product.price}</p>
                   </div>
                   <div className='text'>
                      <Link to = {`/detail/${product.id}`}>
                          < button className="btn btn-primary text">Detalle</button>
                        </Link>
                    </div>                   
                </div>

  )
}
)
export default Item

