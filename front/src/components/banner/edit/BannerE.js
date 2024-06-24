import axios from 'axios'
import Navbar from '../../navbar/navbar';
import React, { useEffect, useState } from 'react';
import {useNavigate,useParams, useLocation, Link} from 'react-router-dom';
import '../banners.css';
/*const endpoint ='http://localhost:8000/api';*/
const endpoint = 'https://admin.tumenuonline.com/api';
/* const endpoint =process.env.REACT_APP_API_URL; */

const BannerE = () => {
    const [name, setName] = useState('');
    const [img, setImg] = useState([]);
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
    const update = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('img', img);

        await axios.post(`${endpoint}${kitchenLink}/bannerE/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        });
        navigate(`${kitchenLink}/banners/`);
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
        const resp = await axios.get(`${endpoint}${kitchenLink}/banner/${id}`, {
            headers: headers,
            ...credentials
        });
        console.log(resp.data.Banner)
        setName(resp.data.Banner.name);
    };
    return (
        <div>
            <h3> Editar Banner</h3>
            <div className="table-container saveb">
                <form onSubmit={update}>
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
                        <div className="col-6 mb-12">
                            <label className='form-label'>Foto o imagen 1200 x 400</label>
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
export default BannerE;
