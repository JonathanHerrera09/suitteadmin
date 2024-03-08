import axios from 'axios'
import Navbar from '../navbar/navbar';
import React, { useEffect, useState } from 'react';
import {useNavigate, useLocation, Link} from 'react-router-dom';
import {socket} from '../../socket/socket';
import './products.css';
const endpoint ='http://localhost:8000/api';
const endpoint2 ='http://localhost:8000/assets/';

const ProductS = () => {
    const [products, setProducts] = useState( [] );
    const [selectedProduct, setSelectedProduct] = useState(null);
    const location = useLocation();
    const segment = location.pathname.split('/')[1];
    const kitchenLink = `/${segment}`;
    useEffect(() => {
        const path = location.pathname;
        const parts = path.split('/');     
        const pathnameWithoutSlash =  parts[1];
        
        const kitchen = localStorage.getItem('kitchen');
        if (pathnameWithoutSlash !==kitchen) {
            window.location.href = '/login';
        } 
    }, [location]);

    const headers = {
        'Content-Type': 'application/json',
    };
    const credentials = {
        withCredentials: true
    };    
    useEffect (()=>{
        getAllProducts()   
    }, [])
    const getAllProducts = async() =>{
       const resp = await axios.get(`${endpoint}${kitchenLink}/productsAll`, {
        headers: headers,
        ...credentials
      });
       setProducts(resp.data.products)
    }
    const deleteProducts = async(id) =>{
        await axios.delete(`${endpoint}${kitchenLink}/productdel/${id}`, {
            headers: headers,
            ...credentials
        });
        getAllProducts()
    }
    return (
        <div>
            <h1>Productos</h1>
            
            <div className="table-container">  
                <Link to={`${kitchenLink}/productC/`} className="btn btn-secondary btn-custom-width">
                    CREAR PRODUCTO
                </Link>
                <table className='table table-striped'>
                    <thead className='table-bordered bg-primary text-white'>
                        <tr>
                            <th>Acciones</th>
                            <th>Img</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Decripcion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product)=>(
                            <tr key={product.id}>
                                <td className='iniA'>
                                    <Link to={`${kitchenLink}/productE/${product.id}`}>
                                        <i className="fas fa-pencil-alt"></i>
                                    </Link>                                    
                                    &nbsp;&nbsp;<i onClick={() => deleteProducts(product.id)} className="fas fa-trash-alt"></i>&nbsp;&nbsp;
                                </td>
                                <img src={`${endpoint2}${product.img}`} alt={product.name} style={{ maxWidth: '30%', height: 'auto' }} />
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Navbar/>
        </div>
    )
}
export default ProductS;