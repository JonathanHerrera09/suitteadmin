import axios from 'axios'
import Navbar from '../navbar/navbar';
import React, { useEffect, useState } from 'react';
import {useNavigate,useParams, useLocation, Link} from 'react-router-dom';
/* import '../banners.css'; */
const endpoint ='http://localhost:8000/api';
const endpoint2 ='http://localhost:8000/assets/favicons/';
/* const endpoint =process.env.REACT_APP_API_URL; */

const Config = () => {
    const [company, setCompany] = useState('');
    const [favicon, setFavicon] = useState([]);
    const [color_nav, setColor_nav] = useState('');
    const [color_cart, setColor_cart] = useState('');
    const [color_btn_p, setColor_btn_p] = useState('');
    const [color_btn_n, setColor_btn_n] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [schedules, setSchedules] = useState('');
    const [slogan, setSlogan] = useState('');
    const [msgfinish, setMsgfinish] = useState('');
    const [color_card, setColor_card] = useState('');
    const [color_footer, setColor_footer] = useState('');
    const [color_text_title, setColor_text_title] = useState('');
    const [color_bag_title, setColor_bag_title] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false); 
    const [id, setId] = useState(1);
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
    const update = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', id);
        formData.append('company', company);
        formData.append('favicon', favicon);
        formData.append('color_nav', color_nav);
        formData.append('color_cart', color_cart);
        formData.append('color_btn_p', color_btn_p);
        formData.append('color_btn_n', color_btn_n);

        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('schedules', schedules);
        formData.append('slogan', slogan);
        formData.append('msgfinish', msgfinish);
        formData.append('color_footer', color_footer);
        formData.append('color_card', color_card);
        formData.append('color_text_title', color_text_title);
        formData.append('color_bag_title', color_bag_title);

        await axios.post(`${endpoint}${kitchenLink}/config`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        });
        setUpdateSuccess(true);
        setTimeout(() => {
            setUpdateSuccess(false);
        }, 2000);
        navigate(`${kitchenLink}/config`);
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
        const resp = await axios.get(`${endpoint}${kitchenLink}/config`, {
            headers: headers,
            ...credentials
        });
        setId(resp.data.id);
        setCompany(resp.data.company);
        setFavicon(resp.data.favicon);
        setColor_nav(resp.data.color_nav);
        setColor_cart(resp.data.color_cart);
        setColor_btn_p(resp.data.color_btn_p);
        setColor_btn_n(resp.data.color_btn_n);

        setEmail(resp.data.email);
        setPhone(resp.data.phone);
        setAddress(resp.data.address);
        setSchedules(resp.data.schedules);
        setSlogan(resp.data.slogan);
        setMsgfinish(resp.data.msgfinish);
        setColor_footer(resp.data.color_footer);
        setColor_card(resp.data.color_card);
        setColor_text_title(resp.data.color_text_title);
        setColor_bag_title(resp.data.color_bag_title);
    };
    return (
        <div>
            {updateSuccess && (
                <div className="alert alert-success" role="alert">
                    ¡El registro se actualizó correctamente!
                </div>
            )}
            <h3> Crear Entrega</h3>
            <div className="table-container saveb">
                <form onSubmit={update}>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-6 mb-12">
                                <label className='form-label'>Nombre</label>
                                <input  
                                    value={company}
                                    onChange={ (e) => setCompany(e.target.value)}
                                    type='text'
                                    className='form-control'
                                />
                            </div>
                            <div className="col-md-6 mb-12">
                                <label className='form-label'>Foto o imagen 500px x 500px</label>
                                <div className="d-flex align-items-center">
                                    <input
                                        onChange={(e) => setFavicon(e.target.files[0])}
                                        type='file'
                                        className='form-control'
                                    />
                                    <img src={`${endpoint2}${favicon}`} alt={favicon} style={{ maxWidth: '5%', height: 'auto' }} />
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-6 mb-12">
                                <label className='form-label'>Email</label>
                                <input  
                                    value={email}
                                    onChange={ (e) => setEmail(e.target.value)}
                                    type='text'
                                    className='form-control'
                                />
                            </div>
                            <div className="col-6 mb-12">
                                <label className='form-label'>Telefono</label>
                                <input  
                                    value={phone}
                                    onChange={ (e) => setPhone(e.target.value)}
                                    type='text'
                                    className='form-control'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-6 mb-12">
                                <label className='form-label'>Direccion</label>
                                <input  
                                    value={address}
                                    onChange={ (e) => setAddress(e.target.value)}
                                    type='text'
                                    className='form-control'
                                />
                            </div>
                            <div className="col-6 mb-12">
                                <label className='form-label'>Horarios</label>
                                <input  
                                    value={schedules}
                                    onChange={ (e) => setSchedules(e.target.value)}
                                    type='text'
                                    className='form-control'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-6 mb-12">
                                <label className='form-label'>Slogan</label>
                                <input  
                                    value={slogan}
                                    onChange={ (e) => setSlogan(e.target.value)}
                                    type='text'
                                    className='form-control'
                                />
                            </div>
                            <div className="col-6 mb-12">
                                <label className='form-label'>Mensaje final de la compra</label>
                                <input  
                                    value={msgfinish}
                                    onChange={ (e) => setMsgfinish(e.target.value)}
                                    type='text'
                                    className='form-control'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-6 mb-12">
                                <label className='form-label'>color_nav</label>
                                <input  
                                    value={color_nav}
                                    onChange={ (e) => setColor_nav(e.target.value)}
                                    type='color'
                                    className='form-control'
                                />
                            </div>
                            <div className="col-6 mb-12">
                                <label className='form-label'>color_cart</label>
                                <input
                                     value={color_cart}
                                     onChange={ (e) => setColor_cart(e.target.value)}
                                     type='color'
                                     className='form-control'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                        <div className="col-6 mb-12">
                                <label className='form-label'>color_btn_p</label>
                                <input
                                     value={color_btn_p}
                                     onChange={ (e) => setColor_btn_p(e.target.value)}
                                     type='color'
                                     className='form-control'
                                />
                            </div>
                            <div className="col-6 mb-12">
                                <label className='form-label'>color_btn_n</label>
                                <input
                                     value={color_btn_n}
                                     onChange={ (e) => setColor_btn_n(e.target.value)}
                                     type='color'
                                     className='form-control'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                        <div className="col-6 mb-12">
                                <label className='form-label'>Color titulo productos</label>
                                <input
                                     value={color_text_title}
                                     onChange={ (e) => setColor_text_title(e.target.value)}
                                     type='color'
                                     className='form-control'
                                />
                            </div>
                            <div className="col-6 mb-12">
                                <label className='form-label'>Color fondo titulo</label>
                                <input
                                     value={color_bag_title}
                                     onChange={ (e) => setColor_bag_title(e.target.value)}
                                     type='color'
                                     className='form-control'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                        <div className="col-6 mb-12">
                                <label className='form-label'>Color de fondo imagenes</label>
                                <input
                                     value={color_card}
                                     onChange={ (e) => setColor_card(e.target.value)}
                                     type='color'
                                     className='form-control'
                                />
                            </div>
                            <div className="col-6 mb-12">
                                <label className='form-label'>color del pie de pagina</label>
                                <input
                                     value={color_footer}
                                     onChange={ (e) => setColor_footer(e.target.value)}
                                     type='color'
                                     className='form-control'
                                />
                            </div>
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
export default Config;