import React, { useEffect, useState} from 'react'
import axios from 'axios'
import './ShowOrder.css';
import Navbar from '../navbar/navbar';
import {Link, useLocation } from 'react-router-dom'
import { Modal } from 'bootstrap';
const endpoint ='http://localhost:8000/api';
const endpoint2 ='http://localhost:8000/assets/';
/* const endpoint ='https://7fa4-190-108-77-184.ngrok-free.app/api';
const endpoint2 ='https://7fa4-190-108-77-184.ngrok-free.app/assets/'; */

const ShowProduct = () => {
    const [products, setProducts] = useState( [] );
    const [selectedProduct, setSelectedProduct] = useState(null);
    const location = useLocation();
    const segment = location.pathname.split('/')[1];
    const kitchenLink = `/${segment}`;
    
    const headers = {
        'Content-Type': 'application/json',
    };
    const credentials = {
        withCredentials: true
    };
    const getAllProducts = async() =>{
       const resp = await axios.get(`${endpoint}${kitchenLink}/products`, {
        headers: headers,
        ...credentials
      });
       setProducts(resp.data.orders)
    }
    const deleteProducts = async(id) =>{
        await axios.delete(`${endpoint}${kitchenLink}/product/${id}`, {
            headers: headers,
            ...credentials
        });
        getAllProducts()
    }
    const openModal = (product) => {
        
        product.products =JSON.parse(product.products);
        /* console.log(product.products); */
        setSelectedProduct(product);
        const myModal = new Modal(document.getElementById('exampleModal')); // Inicializa la modal
        myModal.show(); // Muestra la modal
    }
    const exportToExcel = (startDate, endDate) => {
        // Realizar la solicitud HTTP al backend
        axios.post(`${endpoint}${kitchenLink}/exportSales`, {
            start_date: startDate,
            end_date: endDate
        }, {
            headers: headers,
            withCredentials: true, // Incluir las credenciales en la solicitud
            responseType: 'blob' // Para indicar que esperamos un archivo binario (Excel)
        })
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'sales.xlsx');
            document.body.appendChild(link);
            link.click();
        })
        .catch(error => {
            console.error('Error al exportar a Excel:', error);
        });
    };
    const handleExportClick = () => {
        // Obtener las fechas seleccionadas por el usuario (puedes obtenerlas de tus estados de React)
        const startDate = '2023-03-01'; // Ejemplo: Obtener la fecha de inicio
        const endDate = '2024-03-31'; // Ejemplo: Obtener la fecha de fin
    
        // Llamar a la función de exportación
        exportToExcel(startDate, endDate);
    };
    useEffect(() => {
        const pathnameWithoutSlash = location.pathname.substring(1);
        const kitchen = localStorage.getItem('kitchen');
        if (pathnameWithoutSlash !==kitchen) {
            window.location.href = '/login';
        } else {
            getAllProducts();
        }
    },[]);
    /* useEffect (()=>{
        getAllProducts()   
    },[]) */
  return (
    <div>  
        <div className='titleC'>
                Ordenes
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: '20px' }}>
            <div>
                <input type="date" />
            </div>
            <div>
                <input type="date" />
            </div>
            <div>
                <button onClick={handleExportClick} className="btn btn-success">Exportar Excel</button>
            </div>
        </div>
        <div className="table-container">           
            <table className='table table-striped'>
                <thead className='table-bordered bg-primary text-white'>
                    <tr>
                        <th>Acciones</th>
                        <th>Id</th>
                        <th>Mesa o domicilio</th>
                        <th>Valor a pagar</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product)=>(
                        <tr key={product.id}>
                            <td className='iniA'>
                                <Link to={`${kitchenLink}/edit/${product.id}`}>
                                    <i className="fas fa-pencil-alt"></i>
                                </Link>
                                {/* <button onClick={() => deleteProducts(product.id)} className='btn btn-danger'> */}
                                    &nbsp;&nbsp;<i onClick={() => deleteProducts(product.id)} className="fas fa-trash-alt"></i>&nbsp;&nbsp;
                               {/*  </button> */}
                               {/*  <button  className='btn btn-info'> */}
                                        <i onClick={() => openModal(product)} className="fas fa-eye"></i>
                               {/*  </button> */}
                            </td>
                            <td>{product.id}</td>
                            <td>{product.type_service_name}</td>
                            <td>{product.price}</td>
                            <td>{product.status_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
        <Navbar/>
    </div>
  )
}

export default ShowProduct