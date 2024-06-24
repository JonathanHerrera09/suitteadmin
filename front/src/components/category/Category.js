import axios from 'axios'
import Navbar from '../navbar/navbar';
import React, { useEffect, useState } from 'react';
import {useLocation, Link} from 'react-router-dom';
import './category.css';
/*const endpoint ='http://localhost:8000/api';
const endpoint2 ='http://localhost:8000/assets/categorys/';
*/
const endpoint = 'https://admin.tumenuonline.com/api';
const endpoint2 = 'https://admin.tumenuonline.com/assets/categorys/';

/* const endpoint =process.env.REACT_APP_API_URL;
const endpoint2 =process.env.REACT_APP_ASSETS_URL+'categorys/'; */

const Categorys = () => {
    const [categorys, setCategorys] = useState( [] );
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
    const getAll = async() =>{
       const resp = await axios.get(`${endpoint}${kitchenLink}/categorys`, {
        headers: headers,
        ...credentials
      });
        setCategorys(resp.data)
    }
    const deleteProducts = async(id) =>{
        await axios.delete(`${endpoint}${kitchenLink}/category/${id}`, {
            headers: headers,
            ...credentials
        });
        getAll()
    }
    useEffect (()=>{
        getAll()   
    }, [])
    return (
        <div>
            <h1>Categorias</h1>
            <div className="table-container">  
                <Link to={`${kitchenLink}/categoryC/`} className="btn btn-secondary btn-custom-width">
                    CREAR CATEGORIA
                </Link>
                <div style={{ paddingBottom: '100px' }}>
                    <table className='table table-striped'>
                        <thead className='table-bordered bg-primary text-white'>
                            <tr>
                                <th>Acciones</th>
                                <th>Id</th>
                                <th>Img</th>
                                <th>Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorys.map((detay)=>(
                                <tr key={detay.id}>
                                    <td className='iniA'>
                                        <Link to={`${kitchenLink}/categoryE/${detay.id}`}>
                                            <i className="fas fa-pencil-alt"></i>
                                        </Link>                                    
                                        &nbsp;&nbsp;<i onClick={() => deleteProducts(detay.id)} className="fas fa-trash-alt"></i>&nbsp;&nbsp;
                                    </td>
                                    <td>{detay.id}</td>
                                    <img src={`${endpoint2}${detay.img}`} alt={detay.name} style={{ maxWidth: '20%', height: 'auto' }} />
                                    <td>{detay.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Navbar/>
        </div>
    )
}
export default Categorys;
