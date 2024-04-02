import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../navbar/navbar';
import { socket } from '../../socket/socket';
import { Modal, Button } from 'react-bootstrap';
import {Link, useLocation} from 'react-router-dom'
import coinSound from '../../assets/audio/coin-sound.mp3';
import "./kitchen.css";
const endpoint = 'http://localhost:8000/api';
/* const endpoint =process.env.REACT_APP_API_URL; */
const audio = new Audio(coinSound);

const Kitchen = () => {
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
        try {
            const resp = await axios.get(`${endpoint}${kitchenLink}/kitchen`, {
                headers: headers,
                ...credentials
              });
            setOrders(resp.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
    const calculateCompletion = (order) => {
        const products = JSON.parse(order.products);
        const totalItems = products.length;
        const completedItems = products.filter(product => product.priority === 2).length; // Filtra los productos con priority 2
        return (completedItems / totalItems) * 100;
    };
    const getCardColor = (completion) => {
        if (completion === 0) {
            return 'bg-danger';
        } else if (completion < 50) {
            return 'bg-warning';
        } else {
            return 'bg-success';
        }
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
                {orders.map(order => (
                    <div key={order.id} className="col-md-4 mb-4">
                        <Link to={`${kitchenLink}/Kitchenedit/${order.id}`} >
                            <div className={`card ${getCardColor(calculateCompletion(order))}`}>                        
                                <div className="card-body">
                                    <h5 className="card-title">{order.type_service_name}</h5>
                                    <p className="card-text">Total Products: {JSON.parse(order.products).length}</p>
                                    <p className="card-text">Completion: {calculateCompletion(order).toFixed(2)}%</p>
                                </div>                        
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <Navbar/>
        </div>
    );
};

export default Kitchen;
