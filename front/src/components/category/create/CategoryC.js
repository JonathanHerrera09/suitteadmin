import axios from 'axios'
import Navbar from '../../navbar/navbar';
import React, { useEffect, useState } from 'react';
import {useNavigate, useLocation, Link} from 'react-router-dom';
import '../category.css';
const endpoint ='http://localhost:8000/api';
/* const endpoint =process.env.REACT_APP_API_URL; */

const CategoryC = () => {
    const [name, setName] = useState('');
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
        formData.append('name', name);
        formData.append('img', img);

        const order = await axios.post(`${endpoint}${kitchenLink}/categoryC`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        });
        navigate(`${kitchenLink}/categorys`);
    };
    const headers = {
        'Content-Type': 'application/json',
    };
    const credentials = {
        withCredentials: true
    };
    return (
        <div>
            <h3> Crear Categoria</h3>
            <div className="table-container saveb">
                <form onSubmit={store}>
                    <div className="row">
                        <div className="col-6 mb-12">
                            <label className='form-label'>Nombre</label>
                            <input  
                                value={name}
                                onChange={ (e) => setName(e.target.value)}
                                type='text'
                                className='form-control'
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <label className='form-label'>Foto o imagen</label>
                            <input
                                onChange={(e) => setImg(e.target.files[0])}
                                type='file'
                                className='form-control'
                            />
                        </div>
                    </div>
                    <br/>
                    <button type='submit' className='btn btn-secondary'>Guardar</button>
                </form>                
            </div>
            <Navbar/>
        </div>
    )
}
export default CategoryC;