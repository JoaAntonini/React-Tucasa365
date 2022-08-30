
//con rafce abro el modelo basico

import {Link, NavLink } from 'react-router-dom'
import { useCartContext } from '../Context/CartContext'
import logo from '../img/logo-min.jpg'
import CartWidget from '../NavBar/CartWidget/CartWidget'
import './NavBar.css'

const NavBar = () => {
	const {totalQuantity} = useCartContext()
  return (
	<>	

		<nav className="navbar navbar-expand-md navbar-light backgroundIndex sticky-top w-100" id="navHeader">
  			<div className="container-fluid">
			  <Link to = '/'>
					<img className="navbar-brand" src={logo} alt="logo of Tucasa" />
			</Link>
				<button className="navbar-toggler bg-light p-4" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      				<span className="navbar-toggler-icon"></span>
   				</button>
    			<div className="collapse navbar-collapse" id="navbarNav">
      				<ul className="navbar-nav ms-auto">
					  <NavLink to = "/category/sillones" 
					  className= {({isActive})=>isActive? 'boton-dark' :'boton-light'} >
						<li className="nav-item options">Sillones</li>
					</NavLink>
					<NavLink to = "/category/mesas ratonas" ><li className="nav-item options">Mesas Ratonas</li></NavLink>
					<NavLink to = "/category/lamparas" ><li className="nav-item options">Lamparas</li></NavLink>
					<NavLink to = "/category/alfombras" ><li className="nav-item options">Alfombras</li></NavLink>
					               
					</ul>                    
				</div>
                
				<div >
					<Link to = '/cart'>
					<div  className='options'>
						
						<h6 className='text'>{totalQuantity() !== 0 ? `${totalQuantity()}`: ``} </h6>
					</div>
						<CartWidget/>  
					</Link>       
				</div>				
			</div>
		</nav>
		</>

  )
}

export default NavBar
