import axios from 'axios'
import Navbar from '../navbar/navbar';
import React, { useEffect, useState } from 'react';
import {useNavigate, useLocation, Link} from 'react-router-dom';
import {socket} from '../../socket/socket';
import './fromds.css';
const endpoint ='http://localhost:8000/api';
const endpoint2 ='http://localhost:8000/assets/';

const FromDS = () => {
    const [detays, setDetays] = useState( [] );
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
       const resp = await axios.get(`${endpoint}${kitchenLink}/typeS`, {
        headers: headers,
        ...credentials
      });
        setDetays(resp.data)
    }
    const deleteProducts = async(id) =>{
        await axios.delete(`${endpoint}${kitchenLink}/type/${id}`, {
            headers: headers,
            ...credentials
        });
        getAll()
    }
    return (
        <div>
            <h1>Forma de entrega</h1>
            
            <div className="table-container">  
                <Link to={`${kitchenLink}/fromDeliveryC/`} className="btn btn-secondary btn-custom-width">
                    CREAR ENTREGA
                </Link>
                <table className='table table-striped'>
                    <thead className='table-bordered bg-primary text-white'>
                        <tr>
                            <th>Acciones</th>
                            <th>Id</th>
                            <th>Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {detays.map((detay)=>(
                            <tr key={detay.id}>
                                <td className='iniA'>
                                    <Link to={`${kitchenLink}/fromDeliveryE/${detay.id}`}>
                                        <i className="fas fa-pencil-alt"></i>
                                    </Link>                                    
                                    &nbsp;&nbsp;<i onClick={() => deleteProducts(detay.id)} className="fas fa-trash-alt"></i>&nbsp;&nbsp;
                                </td>
                                <td>{detay.id}</td>
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
export default FromDS;