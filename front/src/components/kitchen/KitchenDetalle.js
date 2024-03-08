import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../navbar/navbar';
import { socket } from '../../socket/socket';
import { Modal } from 'bootstrap';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import coinSound from '../../assets/audio/coin-sound.mp3';

const endpoint = 'http://localhost:8000/api';
const endpoint2 ='http://localhost:8000/assets/';

const audio = new Audio(coinSound);

const KitchenDetalle = () => {
    const location = useLocation();
    useEffect(() => {
        const path = location.pathname;
        const parts = path.split('/');     
        const pathnameWithoutSlash =  parts[1];
        const kitchen = localStorage.getItem('kitchen');
        if (pathnameWithoutSlash !==kitchen) {
            window.location.href = '/login';
        } 
    }, [location]);
    const segment = location.pathname.split('/')[1];
    const kitchenLink = `/${segment}`;
    const headers = {
        'Content-Type': 'application/json',
    };
    const credentials = {
        withCredentials: true
    };
    const [ordersD, setOrdersDeta] = useState([]);
    const [ordersMs, setordersMs] = useState([]);
    const [productId, setproductId] = useState();
    const navigate = useNavigate();
    const { id } = useParams();
    
    useEffect(() => {
        getAllOrderD();
    }, []);

    const modalcheck = (product) => {
        const myModal = new Modal(document.getElementById('exampleModal'));
        myModal.show();
        setproductId(product);
    };
    const upcheck = async (valid) => {        
        const myModal = new Modal(document.getElementById('exampleModal'));
        const updatedOrders = ordersD.map(order => {
            if (order.id === productId) {
                return { ...order, priority: 2 };
            }
            return order;
        });
        await axios.put(`${endpoint}${kitchenLink}/kitchen/${id}`, {           
            product:updatedOrders
        },{
            headers: headers,
            ...credentials
        });
        setOrdersDeta(updatedOrders);   
        myModal.hide();     
    }
    const getAllOrderD = async () => {
        const resp = await axios.get(`${endpoint}${kitchenLink}/kitchen/${id}`, {
            headers: headers,
            ...credentials
        });
        setOrdersDeta(JSON.parse(resp.data.product.products));
        setordersMs(resp.data.product);
    };

    return (
        <div className="container mt-5">
            <div className='titleC'>Productos {ordersMs.type_service_name}</div>
            <br />
            <div className="row row-cols-1 row-cols-md-4">
                {ordersD.map((product, index) => (
                    product.priority === 1 && (
                        <div key={product.id} className="col" style={{ marginBottom: '1rem', marginRight: '1rem' }}>
                            <div className="card" style={{ width: '18rem' }}>
                                <img src={`${endpoint2}${product.img}`} className="card-img-top" alt={product.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">Estado: {product.status_name}</p>
                                    <button onClick={() => modalcheck(product.id)} className='btn btn-success'>
                                        <i className="fas fa-check"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </div>
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">¿Terminaste?</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <b>¿Ya esta listo este producto?</b>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">No</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => upcheck(1)}>Si</button>
                        </div>
                    </div>
                </div>
            </div>
            <Navbar/>
        </div>
    );
};

export default KitchenDetalle;
