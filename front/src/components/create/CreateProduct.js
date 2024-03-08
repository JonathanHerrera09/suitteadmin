import axios from 'axios'
import Navbar from '../navbar/navbar';
import React, { useEffect, useState } from 'react';
import './CreateO.css'
import {useNavigate, useLocation} from 'react-router-dom';
import {socket} from '../../socket/socket';
const endpoint ='http://localhost:8000/api';
const endpoint2 ='http://localhost:8000/assets/';

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
    
    const [description, setDescription]= useState('')
    const [tipoServicio, setTipoServicio] = useState([]);
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
            setDisplayStyle('block');
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

    useEffect(() => {
        // socket.on('product', (data) => {
        //     setProducts(data);
        // });
        return () => {
            // socket.off('product');
        };
    }, []);
    return (
        
        <div>
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
                            className='form-control'
                        />
                        <div className='resultados-busqueda'>
                            <div className="container text-center">
                                <div className='d-flex flex-wrap'>
                                    {searchResults.map(product => (
                                        <div className='col-3' key={product.id} onClick={() => handleProductClick(product)}>
                                            <img src={`${endpoint2}${product.img}`} alt={product.name} />
                                            <p>{product.name}</p>
                                            <p>{product.price}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className='mb-3 saveb'>
                        <label className='form-label'>Cantidad</label>
                        <input  
                            value={stock}
                            onChange={ (e) => setStock(e.target.value)}
                            type='number'
                            className='form-control'
                        />
                    </div> */}
                    <div className='prodCot' style={{ display: displayStyle }}>
                        <div className='centerItems'>
                            <div className="imgContainer">
                                {selectedProducts.map((product, index) => (
                                    <div className='col-2' key={index}>                                
                                        <img src={`${endpoint2}${product.img}`} alt={product.name} />
                                        <p>{product.name}</p>
                                        <p>{product.price}</p>
                                        <input type="number" min="1" name="cant" value={product.quantity} onChange={(e) => handleQuantityChange(index, e)}></input>
                                        <button type="button" onClick={() => handleRemoveProduct(index, product.price)}>X</button>
                                    </div>
                                ))}
                            </div>
                            <div className="allBtn" style={{ maxWidth: '20%' }}>
                            <h4>Total: {totalPrice.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}   </h4>
                                <button type='submit' className='btn btn-primary'>Guardar</button>
                            </div>
                        </div>
                    </div>
                </form>                
            </div>
            <Navbar/>
        </div>
    )
}

export default CreateProduct;
