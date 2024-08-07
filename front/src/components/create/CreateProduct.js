import axios from 'axios'
import Navbar from '../navbar/navbar';
import React, { useEffect, useState } from 'react';
import { Modal } from 'bootstrap';
import './CreateO.css'
import {useNavigate, useLocation} from 'react-router-dom';
import {socket} from '../../socket/socket';
/*const endpoint ='http://localhost:8000/api';
const endpoint2 ='http://localhost:8000/assets/';
*/
const endpoint = 'https://admin.tumenuonline.com/api';
const endpoint2 = 'https://admin.tumenuonline.com/assets/';

/* const endpoint =process.env.REACT_APP_API_URL;
const endpoint2 =process.env.REACT_APP_ASSETS_URL; */
const CreateProduct = () => {
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
    
    const [description, setDescription]= useState('');
    const [numbercart, setNumberCart] = useState(0);
    const [tipoServicio, setTipoServicio] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [selectedTipoServicio, setSelectedTipoServicio] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [displayStyle, setDisplayStyle] = useState('none');
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate()

    const store = async(e) => {
        e.preventDefault()
        const order = await axios.post(`${endpoint}${kitchenLink}/product`,{
            typeService: selectedTipoServicio,
            description: description, 
            price: totalPrice, 
            product:selectedProducts}, {
                headers: headers,
                ...credentials
            });
        navigate(`${kitchenLink}`)
        socket.emit('create-new-order',
        order.data
        )
    };
    const handleProductClick = (product) => {
        product.price = parseFloat(product.price);
        product.quantity = 1;
        setSelectedProducts(prevSelectedProducts => {
            const updatedProducts = [...prevSelectedProducts, product];
            setTotalPrice(updatedProducts.reduce((acc, producto) => acc + producto.price, 0));
            setNumberCart(updatedProducts.length);
            setDisplayStyle('block');
            return updatedProducts;
        });
    };
    const handleIncrement = (index) => {
        setSelectedProducts(prevSelectedProducts => {
            const updatedProducts = prevSelectedProducts.map((product, i) => {
                if (i === index) {
                    return {
                        ...product,
                        quantity: product.quantity + 1
                    };
                }
                return product;
            });
            setTotalPrice(updatedProducts.reduce((acc, producto) => acc + producto.price * producto.quantity, 0)); // Actualizar el precio total
            return updatedProducts;
        });
    }

    // Manejar decremento
    const handleDecrement = (index) => {
        setSelectedProducts(prevSelectedProducts => {
            const updatedProducts = prevSelectedProducts.map((product, i) => {
                if (i === index && product.quantity > 1) {
                    return {
                        ...product,
                        quantity: product.quantity - 1
                    };
                }
                return product;
            });
            setTotalPrice(updatedProducts.reduce((acc, producto) => acc + producto.price * producto.quantity, 0)); // Actualizar el precio total
            return updatedProducts;
        });
    }
    const handleRemoveProduct = (index, productPrice, productQuantity) => {
        var elimTotalPrice = productPrice * productQuantity;
        setSelectedProducts(prevSelectedProducts => {
            const updatedProducts = [...prevSelectedProducts];
            const deletedProduct = updatedProducts.splice(index, 1)[0];     
            setNumberCart(updatedProducts.length);       
            return updatedProducts;
        });
        
        setTotalPrice(prevTotalPrice => prevTotalPrice - elimTotalPrice);
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
    useEffect(() => {
        const getServiceBy = async () => {
            const resp = await axios.get(`${endpoint}${kitchenLink}/products`, {
                headers: headers,
                ...credentials
              });            
            setTipoServicio(resp.data.typeService);            
        };
        const getProductById = async () => {
            const resp = await axios.get(`${endpoint}${kitchenLink}/products`, {
                headers: headers,
                ...credentials
              });
            setProducts(resp.data.products);            
        };
        getProductById();
        getServiceBy();
    }, [0]);

    useEffect(() => {
        const results = products.filter(product =>
            product.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
        );
        setSearchResults(results);
        
    }, [searchTerm, products]);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const openModal = () => {
        const myModal = new Modal(document.getElementById('checkmodal'));
        myModal.show();
    };
    return (
        
        <div className="container mt-5">
            <h3> Crear Orden</h3>
            <div className="table-container saveb">
                <form onSubmit={store}>
                    <div className='mb-3'>
                        <label className='form-label'>Tipo de servicio</label>
                        <select
                            className='form-select'
                            value={selectedTipoServicio}
                            onChange={(e) => setSelectedTipoServicio(e.target.value)}
                        >
                            {tipoServicio.map((tipo) => (
                                <option key={tipo.id} value={tipo.id}>
                                    {tipo.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Nota</label>
                        <input  
                            value={description}
                            onChange={ (e) => setDescription(e.target.value)}
                            type='text'
                            className='form-control'
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Buscar producto...</label>
                        <input
                            type="text"
                            placeholder="Buscar producto..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='form-control'/>
                        <div className='resultados-busqueda'>
                            <div className='content-wrap'>
                                <div className="shop row grid-container gutter-20 has-init-isotope">
                                    <div className='d-flex flex-wrap'>
                                        {searchResults.map(product => (
                                            <div className='col-6 col-md-3 col-sm-6' key={product.id} onClick={() => handleProductClick(product)}>
                                                <img className="imgbrd" src={`${endpoint2}${product.img}`} alt={product.name} />
                                                <p>{product.name}</p>
                                                <p>{product.price}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="cart-icon" onClick={toggleSidebar}>
                        <i className="fas fa-truck"></i>
                        {<span className="top-cart-number">{numbercart}</span>}
                    </div>
                    {isSidebarOpen && (
                        <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                            <div className="sidebar-footer imgContainer">
                                {selectedProducts.map((product, index) => (
                                    <div className="sidebar-footer">
                                        <div className='col-12' key={index}>
                                            <div className="row g-0">
                                                <div className="col-md-12 col-12">
                                                <p>{product.name}</p>
                                                </div>
                                                <div className="col-md-6 col-6">
                                                    <img className="imgbrd" src={`${endpoint2}${product.img}`} alt={product.name}/>
                                                    <p>{product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}</p>
                                                    
                                                </div>
                                                <div className="col-md-6 col-6">
                                                    <i className="fas fa-plus" style={{color: "white"}} onClick={() => handleIncrement(index)}></i>
                                                        <input style={{ color: 'white', borderRadius: '50%', textAlign: 'center'}} type="text" min="1" name="cant" value={product.quantity} onChange={(e) => handleQuantityChange(index, e)} disabled></input>
                                                    <i className="fas fa-minus" style={{color: "white"}} onClick={() => handleDecrement(index)}></i>
                                                    <i className="fas fa-times-circle top-0 end-0 m-1 fs-4" onClick={() => handleRemoveProduct(index, product.price, product.quantity)} ></i>
                                                </div>
                                            </div>
                                        </div>  
                                    </div>
                                ))}
                            </div>
                            <div className="sidebar-footer-logout">
                                <h4>Total: {totalPrice.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}   </h4>                    
                            </div>
                            <button type='submit' className='btn btn-secondary' >Confirmar orden</button>
                        </div>
                    )}
                </form>                
            </div>
            <Navbar/>
        </div>
    )
}

export default CreateProduct;
