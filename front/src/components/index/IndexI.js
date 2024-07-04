import React from 'react';
import './IndexI.css'; // Importar el archivo CSS para estilos

export default function IndexI() {
  return (
    <div>
      <nav className="custom-navbar">
        <div className="custom-navbar-left">
          <img src="../logoMenu.png" alt="Logo" className="custom-logo" />
        </div>
        <div className="custom-navbar-center">
          <a href="/">Tu menú online</a>
        </div>
        <div className="custom-navbar-right">
          <button onClick={() => window.location.href = '/login'}>Mi Cuenta</button>
        </div>
      </nav>
      <div className="custom-banner">
      <div id="carouselExampleIndicators" class="carousel slide">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="http://localhost:8000/assets/Bannerprincipal.png" class="d-block w-100" alt="..."/>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
        </div>
      </div>
    </div>
  );
}
