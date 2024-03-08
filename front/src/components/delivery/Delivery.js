import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../navbar/navbar';
import { socket } from '../../socket/socket';
import { Modal, Button } from 'react-bootstrap';
import {Link, useLocation} from 'react-router-dom'
import coinSound from '../../assets/audio/coin-sound.mp3';

const endpoint = 'http://localhost:8000/api';
const endpoint2 ='http://localhost:8000/assets/';

const audio = new Audio(coinSound);

const Delivery = () => {
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
    const [orders, setOrders] = useState([]);
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [audioPermission, setAudioPermission] = useState(true);
    const [showPermissionMessage, setShowPermissionMessage] = useState(false);

    useEffect(() => {
        const handleSocketConnection = () => {
            setIsConnected(socket.connected);
        };

        socket.on('connect', handleSocketConnection);
        socket.on('get-new-order', handleNewOrder);
        
        getAllOrder();

        requestAudioPermission();

        return () => {
            socket.off('connect', handleSocketConnection);
            socket.off('get-new-order', handleNewOrder);
        }
    }, []);

    const requestAudioPermission = () => {
       /*  if(audioPermission==false){ */
            setShowPermissionMessage(true);
        /* }   */      
    };

    const handlePermissionGranted = () => {
        setAudioPermission(true);
        setShowPermissionMessage(false);
    };
    const handleNewOrder = (data) => {
        setOrders(prevOrders => [...prevOrders, data]);
        if (audioPermission) {
            audio.play();
        }
    };
    const getAllOrder = async () => {
        
        const resp = await axios.get(`${endpoint}${kitchenLink}/deliverys`, {
            headers: headers,
            ...credentials
        });
        const ordersWithProducts = resp.data.flatMap(order => {
            const products = JSON.parse(order.products);
            const filteredProducts = products.filter(product => product.priority === 2);
            return filteredProducts.map(product => ({
                ...product,
                type_service_name: order.type_service_name,
                id_or: order.id
            }));
        });
        console.log(ordersWithProducts)
        setOrders(ordersWithProducts)
    };
    return (
        <div className="container mt-5">
            { !isConnected && <div className="alert alert-danger" role="alert">Desconectado del socket</div>}
            <div className="row">
                <Modal show={showPermissionMessage} onHide={() => setShowPermissionMessage(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Solicitud de Permiso de Audio</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Este sitio web desea reproducir sonidos. ¿Permitir la reproducción de sonido?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowPermissionMessage(false)}>Cancelar</Button>
                        <Button variant="primary" onClick={handlePermissionGranted}>Permitir</Button>
                    </Modal.Footer>
                </Modal>
                {orders.map(product => (
                    <div key={product.id} className="col-md-4 mb-4">
                            <div className="card mb-3" style={{ maxWidth: '540px' }}>
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={`${endpoint2}${product.img}`} className="img-fluid rounded-start" alt={product.name} />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title"> {product.type_service_name} - {product.name}</h5>                                            
                                            <br/>
                                            <div className="d-grid gap-2 col-12 mx-auto">
                                                <button className="btn btn-success" type="button">Entregado</button>                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                ))}
            </div>
            <Navbar/>
        </div>
    );
};

export default Delivery;
