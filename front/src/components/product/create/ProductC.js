import axios from 'axios'
import Navbar from '../../navbar/navbar';
import React, { useEffect, useState } from 'react';
import {useNavigate, useLocation, Link} from 'react-router-dom';
import '../products.css';
/*const endpoint ='http://localhost:8000/api';
const endpoint2 ='http://localhost:8000/assets/';*/
const endpoint = 'https://admin.tumenuonline.com/api';
const endpoint2 = 'https://admin.tumenuonline.com/assets/';

/* const endpoint =process.env.REACT_APP_API_URL;
const endpoint2 =process.env.REACT_APP_ASSETS_URL; */

const ProductC = () => {
    const [categorys, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription]= useState('');
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState([]);
    const navigate = useNavigate();
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
    const store = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('category', selectedCategory);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('img', img);

        const order = await axios.post(`${endpoint}${kitchenLink}/productC`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        });
        navigate(`${kitchenLink}/products/`);
    };
    const headers = {
        'Content-Type': 'application/json',
    };
    const credentials = {
        withCredentials: true
    };    
    useEffect (()=>{
        getAllCategorys()   
    }, [])
    const getAllCategorys = async() =>{
       const resp = await axios.get(`${endpoint}${kitchenLink}/productsAll`, {
        headers: headers,
        ...credentials
      });
       setCategory(resp.data.category)
    }
    return (
        <div>
            <h3> Crear Producto</h3>
            <div className="table-container saveb">
                <form onSubmit={store}>
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label className='form-label'>Tipo de categoria</label>
                            <select
                                className='form-select'
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {categorys.map((tipo) => (
                                    <option key={tipo.id} value={tipo.id}>
                                        {tipo.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-6 mb-3">
                            <label className='form-label'>Nombre</label>
                            <input  
                                value={name}
                                onChange={ (e) => setName(e.target.value)}
                                type='text'
                                className='form-control'
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label className='form-label'>Decripcion</label>
                            <input  
                                value={description}
                                onChange={ (e) => setDescription(e.target.value)}
                                type='text'
                                className='form-control'
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <label className='form-label'>Precio</label>
                            <input  
                                value={price}
                                onChange={ (e) => setPrice(e.target.value)}
                                type='number'
                                className='form-control'
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mb-3">
                            <label className='form-label'>Foto o imagen</label>
                            <input
                                onChange={(e) => setImg(e.target.files[0])}
                                type='file'
                                className='form-control'
                            />
                        </div>
                    </div>
                    <button type='submit' className='btn btn-secondary'>Guardar</button>
                </form>                
            </div>
            <Navbar/>
        </div>
    )
}
export default ProductC;
