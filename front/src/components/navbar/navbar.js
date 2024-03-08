import React, { useState, useEffect } from 'react';
import {useNavigate, useLocation} from 'react-router-dom'
import axios from 'axios';
import './navbar.css'; // Archivo CSS para estilos personalizados
const Navbar = () => {
  const location = useLocation();  
  const segment = location.pathname.split('/')[1];
  const kitchenLink = `/${segment}`;
  const endpoint ='http://localhost:8000/api/logout';
  const headers = {
      'Content-Type': 'application/json',
  };
  const credentials = {
      withCredentials: true
  };
  const navigate = useNavigate()
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
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
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (    
    <>
      <nav className={`navbar ${isNavbarFixed ? 'fixed-bottom' : ''}`}>
        <div className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href={`${kitchenLink}`}>
              <i className="fas fa-home"></i> Inicio
            </a>
            <a className="navbar-item" href={`${kitchenLink}/kitchen`}>
              <i className="fas fa-utensils"></i> Cocina
            </a>
            <a className="navbar-item" href={`${kitchenLink}/create`}>
              <i className="fas fa-plus"></i> Agregar
            </a>
            <a className="navbar-item" href={`${kitchenLink}/delivery`}>
              <i className="fas fa-truck"></i> Entregar
            </a>
            <a className="navbar-item" onClick={toggleSidebar}>
              <i className="fas fa-cog"></i> Configuración
            </a>
          </div>
        </div>
      </nav>
      {isSidebarOpen && (
        <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="sidebar-footer">
            <a href={`${kitchenLink}/perfil`}>
              <i className="fas fa-user"></i> Perfil
            </a>
          </div>
          <div className="sidebar-footer">
            <a href={`${kitchenLink}/products`}>
              <i className="fas fa-box"></i> Productos
            </a>
          </div>
          <div className="sidebar-footer">
            <a href={`${kitchenLink}/formDelivery`}>
              <i className="fas fa-table"></i> Forma de entregas
            </a>
          </div>
          <div className="sidebar-footer">
            <a href={`${kitchenLink}/banners`}>
              <i className="fas fa-image"></i> Banner cliente
            </a>
          </div>
          <div className="sidebar-footer-logout">
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
