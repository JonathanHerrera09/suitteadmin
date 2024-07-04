import React, { useState, useEffect } from 'react';
import { FaUtensils, FaTruck, FaCheckCircle } from 'react-icons/fa';
import './Follow.css'; // Estilos para animaciones

export default function Follow() {
  const [status, setStatus] = useState('Preparando');
  const [orderSummary, setOrderSummary] = useState([
    { name: 'Pizza', quantity: 2, price: 10 },
    { name: 'Burger', quantity: 1, price: 8 },
    { name: 'Soda', quantity: 3, price: 2 }
  ]);
  const [orderId, setOrderId] = useState(null);
  useEffect(() => {
    const savedOrderId = sessionStorage.getItem('orderId');
    console.log(savedOrderId);
    if (savedOrderId) {
      setOrderId(savedOrderId);
    }
    const statuses = ['Preparando'];//Este es el que me va a dar el estado actual que va a tener el movimiento
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % statuses.length;
      setStatus(statuses[index]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const renderIcon = (status, currentStatus) => {
    let className = "icon";
    let color = "gray";
    
    if (status === currentStatus) {
      className += " animate";
      color = "#ff6711";
    } else if (statuses.indexOf(status) <= statuses.indexOf(currentStatus)) {
      color = "#ff6711";
    }

    switch (status) {
      case 'Preparando':
        return <FaUtensils className={className} style={{ color }} />;
      case 'En camino':
        return <FaTruck className={className} style={{ color }} />;
      case 'Entregado':
        return <FaCheckCircle className={className} style={{ color }} />;
      default:
        return null;
    }
  };

  const statuses = ['Preparando', 'En camino', 'Entregado'];
  const calculateTotal = () => {
    return orderSummary.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  return (
    <div className="follow-container">
      <h2>Seguimiento del Pedido</h2>
      <div className="status-container">
        {statuses.map((st, index) => (
          <div key={index} className="status">
            {renderIcon(st, status)}
            <p style={{ color: statuses.indexOf(st) <= statuses.indexOf(status) ? '#ff6711' : 'gray' }}>{st}</p>
          </div>
        ))}
      </div>
      <div className="order-summary">
        <h3>Resumen del Pedido</h3>
        <ul>
          {orderSummary.map((item, index) => (
            <li key={index}>
              {item.name} x {item.quantity} - ${item.price * item.quantity}
            </li>
          ))}
        </ul>
        <h4>Total: ${calculateTotal()}</h4>
      </div>
    </div>
  );
}