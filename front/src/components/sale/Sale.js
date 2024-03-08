import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../navbar/navbar';
import { Link, useLocation } from 'react-router-dom';
import { Modal } from 'bootstrap';
import {socket} from '../../socket/socket';
/* import { FaShoppingCart } from 'react-icons/fa'; */
import "./sale.css";

const endpoint ='http://localhost:8000/api';
const endpoint2 ='http://localhost:8000/assets/';

const Sale = () => {
    const [isNavbarFixed, setIsNavbarFixed] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [productsAll, setProductsAll] = useState('Productos');
    const [banners, setBanners] = useState([]);
    const [categorys, setCategorys] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [displayStyle, setDisplayStyle] = useState('none');
    const [totalPrice, setTotalPrice] = useState(0);
    const [numbercart, setNumberCart] = useState(0);
    const [showCart, setShowCart] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [comments, setComments] = useState('');
    const location = useLocation();
    const segment = location.pathname.split('/')[1];
    const kitchenLink = `/${segment}`;
    useEffect(() => {
        getAllProducts();
    }, []);
    const store = async(e) => {
        e.preventDefault()
        const order = await axios.post(`${endpoint}${kitchenLink}/sale`,{
            typeService:1,
            name: fullName,
            phone:phoneNumber,
            address:address,
            nbh:neighborhood,
            paymeth:paymentMethod,
            description: comments, 
            price: totalPrice, 
            product:selectedProducts}, {              
        });
        socket.emit('create-new-order',
        order.data
        )
        if(order.data){
            const myModal = new Modal(document.getElementById('confir'));
            myModal.show();
        }
    };
    const getAllProducts = async () => {
        const resp = await axios.get(`${endpoint}${kitchenLink}/sales`);
        setProducts(resp.data.products);
        setBanners(resp.data.banners);
        setCategorys(resp.data.categorys);
    };

    const handleCategoryClick = (category) => {
        setProductsAll(category.name);
        setSelectedCategory(category.id);
    };
    const handleProductClick = (product) => {
        product.price = parseFloat(product.price);
        product.quantity = 1;
        setSelectedProducts(prevSelectedProducts => {
            const updatedProducts = [...prevSelectedProducts, product];
            setTotalPrice(updatedProducts.reduce((acc, producto) => acc + producto.price, 0));
            setNumberCart(updatedProducts.length);
            setDisplayStyle('block');
            setShowCart(true);
            return updatedProducts;
        });
    };
    const handleRemoveProduct = (index, productPrice) => {
        setSelectedProducts(prevSelectedProducts => {
            const updatedProducts = [...prevSelectedProducts];
            const deletedProduct = updatedProducts.splice(index, 1)[0];            
            return updatedProducts;
        });
        setTotalPrice(prevTotalPrice => prevTotalPrice - productPrice);
    };
    const handleQuantityChange = (index, event) => {
        const newQuantity = parseInt(event.target.value);
        setSelectedProducts(prevSelectedProducts => {
            const updatedProducts = [...prevSelectedProducts];
            updatedProducts[index].quantity = newQuantity;
            setTotalPrice(updatedProducts.reduce((acc, producto) => acc + producto.price * producto.quantity, 0)); // Actualizar el precio total
            return updatedProducts;
        });
    };
    const openModal = () => {
        const myModal = new Modal(document.getElementById('checkmodal'));
        myModal.show();
    };
    
    const closeModal = () => {
        setShowModal(false);
    };
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };
    return (
        <div>
            <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {banners.map((banner, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <img src={`${endpoint2}banners/${banner.img}`} className="d-block w-100" alt={banner.name} />
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className='ss' style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                {categorys.map((category, index) => (
                    <div key={index} style={{ textAlign: 'center', margin: '0 20px' }}>
                        <img src={`${endpoint2}categorys/${category.img}`} className="rounded-circle" alt="..." style={{ width: '100px', height: '100px', objectFit: 'cover' }} onClick={() => handleCategoryClick(category)} />
                        <h3>{category.name}</h3>
                    </div>
                ))}
            </div>
            <div className="products-container" style={{ marginTop: '50px' }}>
                <h2>{productsAll}</h2>
                <br/>
                <div className='d-flex flex-wrap'>
                    {selectedCategory === null ? 
                        products.map((product, index) => (
                            <div className='col-6 col-md-3' key={index} onClick={() => handleProductClick(product)}>
                                <img src={`${endpoint2}${product.img}`} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p>{product.price}</p>
                            </div>
                        )) :
                        products.filter(product => parseInt(product.category) === selectedCategory).map((product, index) => (
                            <div className='col-6 col-md-3' key={index} onClick={() => handleProductClick(product)}>
                                <img src={`${endpoint2}${product.img}`} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p>{product.price}</p>
                            </div>
                        ))
                    }
                </div>
                
            </div>
            <div className="cart-icon" onClick={toggleSidebar}>
                <i className="fas fa-truck"></i>
                <span className="top-cart-number">{numbercart}</span>
            </div>
            {isSidebarOpen && (
                <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                    <div className="sidebar-footer imgContainer">
                        {selectedProducts.map((product, index) => (
                            <div className="sidebar-footer">
                                <div className='col-2' key={index}>
                                    <img src={`${endpoint2}${product.img}`} alt={product.name}/>
                                    <p>{product.name}</p>
                                    <p>{product.price}</p>
                                    <input type="number" min="1" name="cant" value={product.quantity} onChange={(e) => handleQuantityChange(index, e)}></input>
                                    <button type="button" onClick={() => handleRemoveProduct(index, product.price)}>X</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="sidebar-footer-logout">
                        <h4>Total: {totalPrice.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}   </h4>                    
                    </div>
                    <button type='submit' className='btn btn-secondary' onClick={openModal} >Confirmar orden</button>
                </div>
            )}
            <div className="modal fade" id="checkmodal" aria-labelledby="ModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="ModalLabel">Información adicional</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={store}>
                                <div className="row">
                                    <div className="col-6 mb-3">
                                        <label htmlFor="fullName" className="form-label">Nombre completo</label>
                                        <input type="text" className="form-control" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label htmlFor="phoneNumber" className="form-label">Teléfono - WhatsApp</label>
                                        <input type="tel" className="form-control" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6 mb-3">
                                        <label htmlFor="address" className="form-label">Dirección</label>
                                        <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label htmlFor="neighborhood" className="form-label">Barrio</label>
                                        <input type="text" className="form-control" id="neighborhood" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="paymentMethod" className="form-label">Medio de pago</label>
                                    <input type="text" className="form-control" id="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="comments" className="form-label">Comentario</label>
                                    <textarea className="form-control" id="comments" rows="3" value={comments} onChange={(e) => setComments(e.target.value)}></textarea>
                                </div>
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                                <button type="submit" className="btn btn-secondary" data-bs-dismiss="modal">Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="confir" tabindex="-1" aria-labelledby="confirModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="confirModalLabel">Recibimos tu orden</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <img src="https://media.tenor.com/LLLJYVQJNVAAAAAM/chefs-kiss-french-chef.gif" alt="Chef's kiss gif" />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sale;
