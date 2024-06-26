import axios from 'axios';
import Navbar from '../navbar/navbar';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import './reportsale.css';

const endpoint = 'http://localhost:8000/api';
const endpoint2 = 'http://localhost:8000/assets/';
/* const endpoint =process.env.REACT_APP_API_URL;
const endpoint2 =process.env.REACT_APP_ASSETS_URL+''; */

const ReportProducts = () => {
    const [detays, setDetays] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;
    const location = useLocation();
    const segment = location.pathname.split('/')[1];
    const kitchenLink = `/${segment}`;

    useEffect(() => {
        const path = location.pathname;
        const parts = path.split('/');
        const pathnameWithoutSlash = parts[1];
        
        const kitchen = localStorage.getItem('kitchen');
        if (pathnameWithoutSlash !== kitchen) {
            window.location.href = '/login';
        }
    }, [location]);

    const headers = {
        'Content-Type': 'application/json',
    };
    const credentials = {
        withCredentials: true
    };

    useEffect(() => {
        getAll(currentPage);
    }, [currentPage]);

    const getAll = async (page) => {
        const resp = await axios.get(`${endpoint}${kitchenLink}/reportsP?page=${page}&limit=${itemsPerPage}`, {
            headers: headers,
            ...credentials
        });
        /* console.log(resp.data.products) */
        /* if (isJson(resp.data.products.products)) { */
            /* resp.data.products.products = JSON.parse(resp.data.products.products); */
       /*  } */
        setDetays(resp.data.products);
        setTotalPages(resp.data.totalPages);
    };
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const exportToExcel = async () => {
        const resp = await axios.get(`${endpoint}${kitchenLink}/exportarP`, {
            headers: headers,
            ...credentials
        });
        const orders = resp.data.products;
        const customHeaders = [
            "ID",
            "Tipo de Servicio",
            "Estado",
            "Valor"
        ];
        const dataWithHeaders = orders.map(order => ({
            "ID": order.id,
            "Tipo de Servicio": order.type_service_name,
            "Estado": order.status_name,
            "Valor": order.price
        }));
        const worksheet = XLSX.utils.json_to_sheet(dataWithHeaders, { header: customHeaders });
        const headerStyle = { font: { bold: true } };
        for (let i = 0; i < customHeaders.length; i++) {
            const cellAddress = XLSX.utils.encode_cell({ c: i, r: 0 });
            if (!worksheet[cellAddress]) continue;
            worksheet[cellAddress].s = headerStyle;
        }
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "reportes_productos.xlsx");
    };
    return (
        <div>
            <h1>Reportes de ventas</h1>
            <div className="table-container">
                <button onClick={exportToExcel} className="btn btn-secondary btn-custom-width">
                    Exportar
                </button>
                <div style={{ paddingBottom: '100px' }}>
                    <table className='table table-striped'>
                        <thead className='table-bordered bg-primary text-white'>
                            <tr>
                                <th>Id</th>
                                <th>Tipo</th>
                                <th>Estado</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detays.map((detay) => (
                                
                                <tr key={detay.id}>
                                    <td>{detay.id}</td>
                                    <td>{detay.type_service_name}</td>
                                    <td>{detay.status_name}</td>
                                    <td>{detay.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={index + 1 === currentPage ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Siguiente
                    </button>
                </div>
            </div>
            <Navbar />
        </div>
    );
};

export default ReportProducts;
