
import {useParams } from 'react-router-dom'
import {doc, getDoc, getFirestore} from 'firebase/firestore'
import {useEffect, useState} from 'react'
import ItemDetail from './ItemDetail/ItemDetail'
import Loading from '../Loading/Loading'


const ItemDetailContainer = () => {
  const [ product, setProduct ] = useState([])    
  const {detailId} = useParams() 
  const [ loading, setLoading ] = useState(true)

  //voy a firebase y me importo el producto que me interesa.

  useEffect(()=>{
    const db = getFirestore() //trae firestore
    const queryProduct = doc(db,'Products', detailId) //importa un producto especifico
    getDoc (queryProduct)  //traer documento
    .then(resp => setProduct({ id: resp.id, ...resp.data()}))
    .catch( err => console.log(err) )
    .finally(()=> setLoading(false) )
  }, [detailId])


  return (
    <div>      
       {loading ? 
        <Loading/>
                    : 
                    <ItemDetail product={product}/>
                }      
    </div>
  )
}

export default ItemDetailContainer
