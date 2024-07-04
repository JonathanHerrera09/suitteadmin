import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ShowOrder.css';
import Navbar from '../navbar/navbar.js';
import { Link, useLocation } from 'react-router-dom';
import { Modal } from 'bootstrap';

const endpoint = 'https://admin.tumenuonline.com/api';
const endpoint2 = 'https://admin.tumenuonline.com/assets/';
/*const endpoint = 'http://localhost:8000/api';
const endpoint2 = 'http://localhost:8000/assets/';*/

const ShowProduct = () => {
  const [products, setProducts] = useState([]);
  const [delId, setdelId] = useState('0');
  const [selectedIdsString, setSelectedIdsString] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [statusOptions, setStatusOptions] = useState([]);
  const [checkedProducts, setCheckedProducts] = useState({})
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filter, setFilter] = useState('');
  const location = useLocation();
  const segment = location.pathname.split('/')[1];
  const kitchenLink = `/${segment}`;

  const headers = {
    'Content-Type': 'application/json',
  };
  const credentials = {
    withCredentials: true,
  };

  const getAllProducts = async () => {
    const resp = await axios.get(`${endpoint}${kitchenLink}/products`, {
      headers: headers,
      ...credentials,
    });
    setProducts(resp.data.orders);
    setFilteredProducts(resp.data.orders);
  };

  const deleteProductsModal = async (id) => {
    const myModal = new Modal(document.getElementById('delModal'));
        myModal.show();
        setdelId(id);
    /* await axios.delete(`${endpoint}${kitchenLink}/product/${id}`, {
      headers: headers,
      ...credentials,
    });
    getAllProducts(); */
  };
  const deleteOrder= async (id) => {
    
    await axios.delete(`${endpoint}${kitchenLink}/product/${id}`, {
      headers: headers,
      ...credentials,
    });
    getAllProducts();
  };
  const handleModalChagenClick = async () => {
    try {
      const response = await axios.get(`${endpoint}${kitchenLink}/consultStatusC/`);
      setStatusOptions(response.data);
      const myModal = new Modal(document.getElementById('changeModal'));
      myModal.show();
    } catch (error) {
        console.error("There was an error fetching the PDF!", error);
    }
  };
  const openModal = (product) => {
    const isJson = (string) => {
        try {
            JSON.parse(string);
            return true;
        } catch (e) {
            return false;
        }
    };
    if (isJson(product.products)) {
        product.products = JSON.parse(product.products);
    }
    setSelectedProduct(product);
    const myModal = new Modal(document.getElementById('exampleModal'));
    myModal.show();
};

  const openModalFact = async (product) => {
    try {
        const response = await axios.get(`${endpoint}${kitchenLink}/exportPDF/${product.id}`);
        const pdfUrl = `${endpoint2}exports/${response.data.filename}`;
        const myModal = new Modal(document.getElementById('factModal'));
        myModal.show();
        const pdfIframe = document.getElementById('pdfIframe');
        pdfIframe.src = pdfUrl;
        
    } catch (error) {
        console.error("There was an error fetching the PDF!", error);
    }
  };
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };
  const handleAcceptClick = async () => {
    const selectedIds = Object.keys(checkedProducts).filter(id => checkedProducts[id]);
    try {
      await axios.post(`${endpoint}${kitchenLink}/updateStatus`, {
        ids: selectedIds,
        status: selectedStatus
      });
      getAllProducts();
      const myModalElement = document.getElementById('changeModal');
      const myModal = Modal.getInstance(myModalElement);
      myModal.hide();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  const handleFilterClick = (status) => {
    setFilter(status);
    setFilteredProducts(products.filter((product) => product.status_name === status));
  };

  const clearFilter = () => {
    setFilter('');
    setFilteredProducts(products);
  };
  const handleCheckboxChange = (productId) => {
    setCheckedProducts(prevState => ({
      ...prevState,
      [productId]: !prevState[productId]
    }));
  };
  const isAnyChecked = Object.values(checkedProducts).some(checked => checked);
  useEffect(() => {
    const pathnameWithoutSlash = location.pathname.substring(1);
    const kitchen = localStorage.getItem('kitchen');
    if (pathnameWithoutSlash !== kitchen) {
      window.location.href = '/login';
    } else {
      getAllProducts();
    }
  }, []);

  return (
    <div className="container mt-5">
      <div className='titleC'>Ordenes</div>
      <div className='filter-buttons-container'>
        <div className='filter-buttons'>
            <button onClick={() => handleModalChagenClick('')} className={`btn ${filter === 'Pendiente' ? 'btn-success' : 'btn-secondary'}`} disabled={!isAnyChecked}>Cambio de Estado</button>
            <button onClick={() => handleFilterClick('Pendiente')} className={`btn ${filter === 'Pendiente' ? 'btn-success' : 'btn-secondary'}`}>Pendientes</button>
            <button onClick={() => handleFilterClick('Pagado')} className={`btn ${filter === 'Pagado' ? 'btn-success' : 'btn-secondary'}`}>Pagados</button>
            <button onClick={() => handleFilterClick('Cancelado')} className={`btn ${filter === 'Cancelado' ? 'btn-success' : 'btn-secondary'}`}>Cancelados</button>
            <button onClick={clearFilter} className="btn btn-secondary">Limpiar Filtro</button>
        </div>
    </div>
      <div className="cards-container2">
        {filteredProducts.map((product) => (
          <div key={product.id} className='card2 '>
            <div className='card-body2 '>
              <div className='card-actions'>
                <Link to={`${kitchenLink}/edit/${product.id}`}>
                  <i className="fas fa-pencil-alt"></i>
                </Link>
                  <i onClick={() => deleteProductsModal(product.id)} className="fas fa-trash-alt"></i>
                  <i onClick={() => openModal(product)} className="fas fa-eye"></i>
                  <i onClick={() => openModalFact(product)} className="fas fa-file"></i>
                  <input
                    type="checkbox"
                    checked={checkedProducts[product.id] || false}
                    onChange={() => handleCheckboxChange(product.id)}
                  />
              </div>
              <p>ID: {product.id}</p>
              <p>Mesa o domicilio: {product.type_service_name}</p>
              <p>Valor a pagar: {product.price}</p>
              <p>Estado: {product.status_name}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Detalles del Producto</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', overflowX: 'auto' }}>
              {selectedProduct && (
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <p>ID: {selectedProduct.id}</p>
                  <p>Mesa o domicilio: {selectedProduct.type_service_name}</p>
                  <p>Valor a pagar: {selectedProduct.price}</p>
                  <p>Estado: {selectedProduct.status_name}</p>
                  <p>Productos:</p>
                </div>
              )}
              {selectedProduct && selectedProduct.products && Array.isArray(selectedProduct.products) ? (
                selectedProduct.products.map((product) => (
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
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="factModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Detalles del Producto</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', overflowX: 'auto' }}>
                        <div id="pdfContainer" style={{ width: '100%', height: '500px' }}>
                            <iframe id="pdfIframe" src="" style={{width: '100%', height: '100%', border: 'none'}}></iframe>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
      </div>
      <div className="modal fade" id="changeModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Cambiar de estado</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', overflowX: 'auto' }}>
                    <select className="form-select" value={selectedStatus} onChange={handleStatusChange}>
                      <option value="">Seleccione un estado</option>
                      {statusOptions.map(option => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" className="btn btn-primary" onClick={handleAcceptClick}>Aceptar</button>
                  </div>
              </div>
          </div>
      </div>
      <div className="modal fade" id="delModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Elimiar</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <b>¿Deseas eliminar esta orden?</b>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">No</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => deleteOrder(1)}>Si</button>
                        </div>
                    </div>
                </div>
            </div>
      <Navbar />
    </div>
  );
};
export default ShowProduct;
