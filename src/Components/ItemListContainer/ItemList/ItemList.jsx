
import  { memo } from 'react'

import Item from '../Item/Item'
import './ItemList.css'

const ItemList = memo(({ products }) => {


     
  return (
    <>
      <div id="box">
      <div className='container-fluid'>
      <div className="row">
    
        {products?.map( product => <Item key={ product.id} product={product} /> )} 
        </div>

        </div>
        </div>
    </>
  )
}
)


export default ItemList

