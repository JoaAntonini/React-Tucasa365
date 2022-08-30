
import ItemList from './ItemList/ItemList'
import {useEffect , useState } from 'react'
import {collection,  getDocs, getFirestore, query, where} from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import './ItemListContainer.css'

const ItemListContainer = () => {
  const [ products, setProducts ] = useState([])    
  const [ loading, setLoading ] = useState(true)
  const { categoryId } = useParams()
  
  
//voy a firebase e importo un producto especifio o una categoria.
  const GetProductsFirestore = (categoryId) =>{    
    const db = getFirestore() //trae firestore
    const queryCollection = collection(db,'Products') //importa un producto especifico
    const queryFiltered = categoryId ?  query(queryCollection, where('category', '==', categoryId)) : queryCollection //importa por categoria
    getDocs (queryFiltered)  //traer documento
    .then(resp => setProducts( resp.docs.map(prod => ({id: prod.id, ...prod.data()})) ) )
    .catch( err => console.log(err) )
    .finally(()=> setLoading(false) )
  }

  useEffect(()=>{
    GetProductsFirestore(categoryId)    
}, [categoryId])



     
  return (
    <>
      <div id="buttonDoc">
        <button type="button" className="btn btn-lg btn-block" id="title">Productos</button>          
      </div>
       { loading ? 
        <Loading/>
                    : 
                    <ItemList products={products} />
                }
    </>
  )
}

export default ItemListContainer