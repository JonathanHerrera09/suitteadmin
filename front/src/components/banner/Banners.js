import axios from 'axios'
import Navbar from '../navbar/navbar';
import React, { useEffect, useState } from 'react';
import {useNavigate, useLocation, Link} from 'react-router-dom';
import {socket} from '../../socket/socket';
import './banners.css';
const endpoint ='http://localhost:8000/api';
const endpoint2 ='http://localhost:8000/assets/banners/';

const Banners = () => {
    const [banners, setBanners] = useState( [] );
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
        getAll()   
    }, [])
    const getAll = async() =>{
       const resp = await axios.get(`${endpoint}${kitchenLink}/banners`, {
        headers: headers,
        ...credentials
      });
        setBanners(resp.data)
    }
    const deleteProducts = async(id) =>{
        await axios.delete(`${endpoint}${kitchenLink}/banner/${id}`, {
            headers: headers,
            ...credentials
        });
        getAll()
    }
    return (
        <div>
            <h1>Forma de entrega</h1>
            <div className="table-container">  
                <Link to={`${kitchenLink}/bannerC/`} className="btn btn-secondary btn-custom-width">
                    CREAR BANNER
                </Link>
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
                        {banners.map((detay)=>(
                            <tr key={detay.id}>
                                <td className='iniA'>
                                    <Link to={`${kitchenLink}/bannerE/${detay.id}`}>
                                        <i className="fas fa-pencil-alt"></i>
                                    </Link>                                    
                                    &nbsp;&nbsp;<i onClick={() => deleteProducts(detay.id)} className="fas fa-trash-alt"></i>&nbsp;&nbsp;
                                </td>
                                <td>{detay.id}</td>
                                <img src={`${endpoint2}${detay.img}`} alt={detay.name} style={{ maxWidth: '30%', height: 'auto' }} />
                                <td>{detay.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Navbar/>
        </div>
    )
}
export default Banners;