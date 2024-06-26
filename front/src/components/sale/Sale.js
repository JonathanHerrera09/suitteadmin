import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Modal } from 'bootstrap';
import {socket} from '../../socket/socket';

import "./sale.css";

/* const endpoint ='http://18.118.226.208/api'; */

const Sale = () => {
/*    const endpoint ='http://localhost:8000/api';
    const endpoint2 ='http://localhost:8000/assets/';
*/
    const endpoint ='https://admin.tumenuonline.com/api';
    const endpoint2 ='https://admin.tumenuonline.com/assets/';
    const [color_nav, setColor_nav] = useState('');
    const [color_cart, setColor_cart] = useState('');
    const [color_btn_p, setColor_btn_p] = useState('');
    const [color_btn_n, setColor_btn_n] = useState('');
    const [config, setConfig] = useState('');
    const [paymenth, setPaymenth] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [productsAll, setProductsAll] = useState('Productos');
    const [banners, setBanners] = useState([]);
    const [categorys, setCategorys] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [numbercart, setNumberCart] = useState(0);
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [comments, setComments] = useState('');
    const location = useLocation();
    const segment = location.pathname.split('/')[1];
    const kitchenLink = `/${segment}`;
    const validate = () => {
        const errors = {};
        if (!fullName) errors.fullName = 'Nombre completo es requerido';
        if (!phoneNumber) errors.phoneNumber = 'Numero de telefono es requerido';
        if (!address) errors.address = 'Direccion es requerido';
        if (!neighborhood) errors.neighborhood = 'Barrio es requerido';
        if (!paymentMethod) errors.paymentMethod = 'Metodo de pago es requerido';
        if (!selectedProducts.length) errors.selectedProducts = 'Debes de tener algun producto seleccionado';
        return errors;
      };
    const store = async(e) => {
        e.preventDefault();
        const errors = validate();
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            try {
                const order = await axios.post(`${endpoint}${kitchenLink}/sale`, {
                    typeService: 1,
                    name: fullName,
                    phone: phoneNumber,
                    address: address,
                    nbh: neighborhood,
                    paymeth: paymentMethod,
                    description: comments,
                    price: totalPrice,
                    product: selectedProducts
                });
                socket.emit('create-new-order', JSON.stringify(order.data.order));
                if (order.data) {
                    const myModalElement = document.getElementById('checkmodal');
                    const myModal2 = Modal.getInstance(myModalElement);
                    myModal2.hide();
                    const myModal = new Modal(document.getElementById('confir'));
                    myModal.show();
                }
            } catch (error) {
                const errorMessage = error.response ? error.response.data.message : 'An error occurred. Please try again.';
                document.getElementById('errorMessage').innerText = errorMessage;
                const errorModal = new Modal(document.getElementById('errorModal'));
                errorModal.show();
            }
        }
    };
    
    const getAllProducts = useCallback(async () => {
        try {
            const resp = await axios.get(`${endpoint}${kitchenLink}/sales`);
            document.title = resp.data.config.company;
            const favicon = document.querySelector('link[rel="icon"]');
            if (favicon) {
/*                const endpoint2 = 'http://localhost:8000/assets/';*/
                favicon.href = endpoint2 + 'favicons/' + resp.data.config.favicon;
            }
            setColor_btn_p(resp.data.config.color_btn_p);
            setColor_btn_n(resp.data.config.color_btn_n);
            setColor_cart(resp.data.config.color_cart);
            setColor_nav(resp.data.config.color_nav);
            setPaymenth(resp.data.paymenth);
            setConfig(resp.data.config);
            setProducts(resp.data.products);
            setBanners(resp.data.banners);
            setCategorys(resp.data.categorys);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    }, [endpoint, kitchenLink]);
    useEffect(() => {
        getAllProducts();
    }, [getAllProducts]);

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
            setIsSidebarOpen(!isSidebarOpen);
            return updatedProducts;
        });
    };
    const handleRemoveProduct = (index, productPrice, productQuantity) => {
        var elimTotalPrice = productPrice * productQuantity;
        setSelectedProducts(prevSelectedProducts => {
            const updatedProducts = [...prevSelectedProducts];
            const deletedProduct = updatedProducts.splice(index, 1)[0]; 
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
    // Manejar incremento
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
    const wht = () => {
        /* const pdfURL =` ${endpoint2}pdfs/1.pdf`;
        const mensaje = "¡Aquí está tu PDF! " + pdfURL; */
        const whatsappURL = "https://api.whatsapp.com/send?phone=573126774392&text=Quetal%20%7Bempresa%7D%2C%20acabo%20de%20hacer%20mi%20pedido%2C%20es%20la%20orden%20%7Bnumero%7D";
        window.open(whatsappURL);
    }
    const openModal = () => {
        const myModal = new Modal(document.getElementById('checkmodal'));
        myModal.show();
    };
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className='container1'>
            <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {banners.map((banner, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <img src={`${endpoint2}banners/${banner.img}`} className="d-block w-100 img-fluid" alt={banner.name} />
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
            <div className="overflow-auto">
                <div className='categoryre'>
                    {categorys.map((category, index) => (
                        <div key={index} style={{ textAlign: 'center', margin: '0 20px' }}>
                            <img src={`${endpoint2}categorys/${category.img}`} className="rounded-circle" alt="..." style={{ width: '100px', height: '100px', border: '3px solid'+ color_btn_p,  objectFit: 'cover' }} onClick={() => handleCategoryClick(category)} />
                            <h3>{category.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
            <div className='container'>
                <div className="products-container" style={{ marginTop: '50px' }}>
                    <h2>{productsAll} </h2>
                    <br/>
                    <div className='content-wrap'>
                        <div className='shop row grid-container gutter-20 has-init-isotope'>
                            <div className='d-flex flex-wrap'>
                                {selectedCategory === null ? 
                                    products.map((product, index) => (
                                        <div className="col-12 col-md-6 mb-4 mx-1" key={index} style={{maxWidth: "540px" }}>
                                            <div className="card cardSale" style={{background:config.color_card, borderColor:config.color_card, borderRadius:'20px'}}>
                                                <div className="row g-0">
                                                    <div className="col-md-4 col-4">
                                                        <img className="imgbrd" src={`${endpoint2}${product.img}`} alt={product.name} />
                                                    </div>
                                                    <div className="col-md-8 col-8">
                                                        <div className="card-body">
                                                            <h5 className="card-title" >
                                                                <span 
                                                                    style={{
                                                                        backgroundColor: config.color_bag_title,
                                                                        border: '1px solid transparent',
                                                                        borderRadius: '50px',
                                                                        paddingLeft: '20px',
                                                                        paddingRight: '20px',
                                                                        color: config.color_text_title,
                                                                        display: 'inline-block',
                                                                        maxWidth: '100%',
                                                                        textAlign: 'center',
                                                                        wordWrap: 'break-word',
                                                                      }}
                                                                                ><b>{product.name}</b>
                                                                </span>
                                                            </h5>
                                                            <hr/>
                                                            <p className="card-text"><small><b>{product.description}</b></small></p>
                                                            <h5><small style={{ color: color_btn_p }} >
                                                                <b>{product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}</b>
                                                            </small></h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <i style={{ color: color_btn_p }} className="fas fa-plus-circle position-absolute bottom-0 end-0 m-3 fs-1" onClick={() => handleProductClick(product)}></i>
                                            </div>
                                        </div>
                                    )) :
                                    products.filter(product => parseInt(product.category) === selectedCategory).map((product, index) => (
                                        <div className="col-12 col-md-6 mb-4 mx-1" key={index} style={{maxWidth: "540px" }}>
                                            <div className="card cardSale" style={{background:config.color_card, borderColor:config.color_card}}>
                                                <div className="row g-0">
                                                    <div className="col-md-4 col-4">
                                                        <img className="imgbrd" src={`${endpoint2}${product.img}`} alt={product.name} />
                                                    </div>
                                                    <div className="col-md-8 col-8">
                                                        <div className="card-body">
                                                            <h5 className="card-title" ><span style={{ backgroundColor: config.color_bag_title, border: '1px', borderRadius: '50px', paddingLeft: '20px', paddingRight: '20px', color: config.color_text_title}}><b>{product.name}</b></span></h5>
                                                            <p className="card-text"><b>{product.description}</b></p>
                                                            <p className="card-text"><small style={{ color: color_btn_p }} >
                                                                <b>{product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}</b>
                                                            </small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <i style={{ color: color_btn_p }} className="fas fa-plus-circle position-absolute bottom-0 end-0 m-3 fs-1" onClick={() => handleProductClick(product)}></i>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ backgroundColor:  color_cart}} className="cart-icon" onClick={toggleSidebar}>
                    <i className="fas fa-truck"></i>
                    <span style={{ backgroundColor:  color_cart}} className="top-cart-number">{numbercart}</span>
                </div>
                {isSidebarOpen && (
                    <div style={{ backgroundColor:  color_nav}} className={`sidebarSales ${isSidebarOpen ? 'sidebarSales-open' : ''}`}>
                        <div className="sidebarSales-footer imgContainer">
                            {selectedProducts.map((product, index) => (
                                <div className="sidebarSales-footer">
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
                                                <i className="fas fa-times-circle top-0 end-0 m-1 fs-4" onClick={() => handleRemoveProduct(index, product.price, product.quantity)} style={{ color: color_btn_n, padding:'5px'}}></i>
                                            </div>
                                        </div>
                                    </div>  
                                </div>
                            ))}
                        </div>
                        <div className="sidebarSales-footer-logout">
                            <h4>Total: {totalPrice.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}</h4>
                        </div>
                        <button type='submit' style={{ backgroundColor:  color_btn_p}} className='btn btn-secondary' onClick={openModal} >Confirmar orden</button>
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
                                            {formErrors.fullName && <div className="text-danger">{formErrors.fullName}</div>}
                                        </div>
                                        <div className="col-6 mb-3">
                                            <label htmlFor="phoneNumber" className="form-label">Teléfono - WhatsApp</label>
                                            <input type="tel" className="form-control" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                            {formErrors.phoneNumber && <div className="text-danger">{formErrors.phoneNumber}</div>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 mb-3">
                                            <label htmlFor="address" className="form-label">Dirección</label>
                                            <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                            {formErrors.address && <div className="text-danger">{formErrors.address}</div>}
                                        </div>
                                        <div className="col-6 mb-3">
                                            <label htmlFor="neighborhood" className="form-label">Barrio</label>
                                            <input type="text" className="form-control" id="neighborhood" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />
                                            {formErrors.neighborhood && <div className="text-danger">{formErrors.neighborhood}</div>}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="paymentMethod" className="form-label">Medio de pago</label>
                                        <input type="text" className="form-control" id="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />
                                        {formErrors.paymentMethod && <div className="text-danger">{formErrors.paymentMethod}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="comments" className="form-label">Comentario</label>
                                        <textarea className="form-control" id="comments" rows="3" value={comments} onChange={(e) => setComments(e.target.value)}></textarea>
                                    </div>
                                    <button type="button" style={{ backgroundColor:  color_btn_n}}  className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="submit" style={{ backgroundColor:  color_btn_p}}  className="btn btn-secondary">Enviar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="confir" tabIndex="-1" aria-labelledby="confirModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="confirModalLabel">Recibimos tu orden</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Tu orden fue creada con exito ayudamos a agilizar tu pedido
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" className="btn btn-primary"  onClick={() => wht()}>Confirmación en WhastApp</button>
                                <button type="button" className="btn btn-success"  onClick={() => wht()}>Seguir mi pedido</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="confir" tabIndex="-1" aria-labelledby="confirLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="confirLabel">Confirmation</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Order created successfully.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="errorModal" tabIndex="-1" aria-labelledby="errorModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="errorModalLabel">Error</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                         <span id="errorMessage">{errorMessage}</span>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <footer style={{ background: config.color_footer}}className="footer mt-auto py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h3>Horarios</h3>
                            {/* <img className="imgbrd" src={`${endpoint2}/favicons/${footer.favicon}`} alt={footer.favicon} /> */}
                            <p className="mt-auto">{config.schedules}</p>
                            <p>{config.slogan}</p>
                        </div>
                        <div className="col-md-4 d-flex flex-column align-items-end"> {/* Agrega la clase 'align-items-end' para alinear el contenido al final */}
                            <div className="float-end">
                                <h3>Información de contacto:</h3>
                                <p><b>Email:</b> {config.email}</p>
                                <p><b>Teléfono:</b> {config.phone}</p>
                                <p><b>Dirección:</b> {config.address}</p>
                            </div>
                        </div>
                        <div className="col-md-4 d-flex flex-column align-items-end"> {/* Agrega la clase 'align-items-end' para alinear el contenido al final */}
                            <img className="imgbrd" src={`${endpoint2}/favicons/${config.favicon}`} alt={config.favicon} />
                            <span className="text-muted mt-auto">Creado con <i className="fas fa-heart"></i> por Jonathan Herrera</span> {/* Usa 'mt-auto' para empujar el contenido al final */}
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
}

export default Sale;
