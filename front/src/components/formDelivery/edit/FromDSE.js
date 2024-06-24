import axios from 'axios'
import Navbar from '../../navbar/navbar';
import React, { useEffect, useState } from 'react';
import {useNavigate,useParams, useLocation} from 'react-router-dom';
import '../fromds.css';
/*const endpoint ='http://localhost:8000/api';*/
const endpoint = 'https://admin.tumenuonline.com/api';
/* const endpoint =process.env.REACT_APP_API_URL; */

const FromDSE = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
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
    const update = async (e) => {
        e.preventDefault();
        await axios.put(`${endpoint}${kitchenLink}/type/${id}`, {
            name: name
        },{
            headers: headers,
            ...credentials
        });
        navigate(`${kitchenLink}/formDelivery`);
    };
    const headers = {
        'Content-Type': 'application/json',
    };
    const credentials = {
        withCredentials: true
    };
    useEffect (()=>{
        getProductById()   
    }, [])
    const getProductById = async () => {
        const resp = await axios.get(`${endpoint}${kitchenLink}/type/${id}`, {
            headers: headers,
            ...credentials
        });
        setName(resp.data.typeService.name);
    };
    return (
        <div>
            <h3> Editar Entrega</h3>
            <div className="table-container saveb">
                <form onSubmit={update}>
                    <div className="row">
                        <div className="col-12 mb-12">
                            <label className='form-label'>Nombre</label>
                            <input  
                                value={name}
                                onChange={ (e) => setName(e.target.value)}
                                type='text'
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
export default FromDSE;
