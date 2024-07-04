import React, { useState, useEffect } from 'react';
import {useNavigate, useLocation} from 'react-router-dom'
import axios from 'axios';
import './navbar.css'; // Archivo CSS para estilos personalizados
const Navbar = () => {
  const location = useLocation();  
  const segment = location.pathname.split('/')[1];
  const kitchenLink = `${segment}`;
 /* const endpoint =`http://localhost:8000/api/${kitchenLink}/logout/${kitchenLink}`;*/
    const endpoint =`https://admin.tumenuonline.com/api/${kitchenLink}/logout/${kitchenLink}`;
  /* console.log(endpoint); */
  /* const endpoint =process.env.REACT_APP_API_URL+'/logout'; */
  const headers = {
      'Content-Type': 'application/json',
  };
  const credentials = {
      withCredentials: true
  };
  const navigate = useNavigate()
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsNavbarFixed(true);
      } else {
        setIsNavbarFixed(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const logout = () => {
    axios.post(endpoint, {}, {
      headers: headers, 
      ...credentials 
    })
    .then(response => {
      navigate('/login');
    })
    .catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }
  const handleDropdownToggle = (e) => {
        e.preventDefault();
        setIsDropdownOpen(!isDropdownOpen);
      };
    
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (    
    <>
    
      <nav className={`navbar ${isNavbarFixed ? 'fixed-bottom' : ''}`}>
      <div className="overflow-auto">
        <div className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href={`../../${kitchenLink}`}>
              <i className="fas fa-home"></i> Inicio
            </a>
            <a className="navbar-item" href={`../../${kitchenLink}/kitchen`}>
              <i className="fas fa-utensils"></i> Cocina
            </a>
            <a className="navbar-item" href={`../../${kitchenLink}/create`}>
              <i className="fas fa-plus"></i> Agregar
            </a>
            <a className="navbar-item" href={`../../${kitchenLink}/delivery`}>
              <i className="fas fa-truck"></i> Entregar
            </a>
            <a className="navbar-item" onClick={toggleSidebar}>
              <i className="fas fa-cog"></i> Configuración
            </a>
          </div>
        </div></div>
      </nav>
      {isSidebarOpen && (
        <div className={`sidebarInter ${isSidebarOpen ? 'sidebarInter-open' : ''}`}>
          <div className="sidebarInter-footer">
            <a href={`../../${kitchenLink}/config`}>
              <i className="fas fa-user"></i> Perfil
            </a>
          </div>
          <div className="sidebarInter-footer">
            <a href={`../../${kitchenLink}/config`}>
              <i className="fas fa-users"></i> Usuarios
            </a>
          </div>
          <div className="sidebarInter-footer">
            <a href={`../../${kitchenLink}/products`}>
              <i className="fas fa-box"></i> Productos
            </a>
          </div>
          <div className="sidebarInter-footer">
            <a href={`../../${kitchenLink}/categorys`}>
              <i className="fas fa-box-open"></i> Categorias
            </a>
          </div>
          <div className="sidebarInter-footer">
            <a href={`../../${kitchenLink}/formDelivery`}>
              <i className="fas fa-table"></i> Forma de entregas
            </a>
          </div>
          <div className="sidebarInter-footer">
            <a href={`../../${kitchenLink}/banners`}>
              <i className="fas fa-image"></i> Banner cliente
            </a>
          </div>
          <div className="sidebarInter-footer">
            <a onClick={handleDropdownToggle}>
              <i className="fa fa-file-excel-o"></i> Reportes
            </a>
            {isDropdownOpen && (
              <div className="dropdown-menu2">
                <a href={`../../${kitchenLink}/reports`} className="dropdown-item2">Reporte de Ventas</a>
                <a href={`../../${kitchenLink}/reportsp`} className="dropdown-item2">Reporte de Productos</a>
              </div>
            )}
          </div>
          <div className="sidebarInter-footer-logout">
            <a href="#"  onClick={logout}>
              <i className="fas fa-sign-out-alt"></i> Salir
            </a>
          </div>
          {/* Otros elementos del sidebar */}
        </div>
      )}
    </>
  );
}

export default Navbar;
