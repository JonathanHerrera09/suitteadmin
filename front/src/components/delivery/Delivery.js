import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../navbar/navbar';
import { socket } from '../../socket/socket';
import {Modal, Button } from 'react-bootstrap';
import {useLocation} from 'react-router-dom'
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
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [deliverys, setDeliverys] = useState([]);
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [audioPermission, setAudioPermission] = useState(true);
    const [showPermissionMessage, setShowPermissionMessage] = useState(false);
    const [showInfoMessage, setShowInfoMessage] = useState(false);

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
            setShowPermissionMessage(true);     
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
            const filteredProducts = products.filter(product => product.priority === 2 && order.typeService !== '1');
            return filteredProducts.map(product => ({
                ...product,
                type_service_name: order.type_service_name,
                id_or: order.id
            }));
        });
        setOrders(ordersWithProducts)
        const deliveryWithProducts = resp.data.filter(order => order.status === 1 && order.typeService !== '5');
        setDeliverys(deliveryWithProducts)
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
    const openModal = (product) => {
        
       /*  console.log(product.products); */
        var productcc = JSON.parse(product.products);
        console.log(productcc);
        setSelectedProduct(product);
        setSelectedProducts(productcc);
        setShowInfoMessage(true)
    }
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
                <h3> Productos de la mesa</h3>
                {orders.map((product, index) => (
                    <div key={`order-${product.id}-${index}`} className="col-md-4 mb-4">
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
                                                <button className="btn btn-secondary" type="button">Entregado</button>                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                ))}
                <h3> Domicilios</h3>
                {deliverys.map((orderD, index) => (
                    <div key={`delivery-${orderD.id}-${index}`} className="col-md-4 mb-4">
                            <div className={`card ${getCardColor(calculateCompletion(orderD))}`}>                        
                                <div className="card-body">
                                    <h5 className="card-title">{orderD.type_service_name}</h5>
                                    <p className="card-text">Direccion de entrega: {orderD.address}</p>
                                    <p className="card-text">Total Products: {JSON.parse(orderD.products).length}</p>
                                    <div className="d-grid gap-2 col-12 mx-auto">
                                        <button className="btn btn-secondary" type="button">Entregado</button>                                                
                                        <button className="btn btn-light" onClick={() => openModal(orderD)} type="button">Info</button>
                                    </div>
                                </div>
                            </div>
                    </div>
                ))}
            </div>
            <Modal show={showInfoMessage} onHide={() => setShowInfoMessage(false)}>
                <div className="modal-body" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', overflowX: 'auto' }}>
                    {selectedProduct && (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <p>ID: {selectedProduct.id}</p>
                            <p>Mesa o domicilio: {selectedProduct.type_service_name}</p>
                            <p>Valor a pagar: {selectedProduct.price}</p>
                            <p>Estado: {selectedProduct.status_name}</p>
                            <p>Productos:  </p>
                        </div>
                    )}
                    {selectedProducts && selectedProducts && Array.isArray(selectedProducts) ? (
                            selectedProducts.map((product) => (
                                <div key={product.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <img src={`${endpoint2}${product.img}`} alt={product.name} style={{ width: '100px', height: 'auto' }} />
                                    <p>Nombre: {product.name}</p>
                                    <p>Precio: {product.price}</p>
                                </div>
                            ))
                    ) : (
                        <p>No hay productos disponibles</p>
                    )}
                    
                </div>
            </Modal>
            
            <Navbar/>
        </div>
    );
};

export default Delivery;
