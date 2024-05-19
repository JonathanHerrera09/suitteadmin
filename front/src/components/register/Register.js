import React from 'react';
import './register.css';
import image50 from '../../assets/50.png';
import image100 from '../../assets/100.png';
import image200 from '../../assets/200.png';
export default function Register() {
  return (
    <div className="register-b">
      <div className="container text-center">
        <div className="row align-items-center">
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="card register-box">
                <div className="card-header" style={{ backgroundImage: `url(${image50})`, backgroundSize: 'cover',   backgroundPosition: 'center'  }}>
                    <h3><b>BASICO</b></h3>
                    {/* <p>Lorem Ipsum</p> */}
                </div>
              <div className="card-body">
                <ul className="list-unstyled">
                  <li>3 Usuarios</li>
                    <hr/>
                  <li>50 Ordenes mensuales</li>
                    <hr/>
                  <li>20 Productos</li>
                    <hr/>
                  <li>Con plataforma para clientes</li>
                    <hr/>
                </ul>
                <div className="card-price">GRATIS</div>
              </div>
              <div className="card-footer">
                <a href="#" className="btn btn-registerN btn-signup">REGISTARME</a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="card register-box">
            <div className="card-header" style={{ backgroundImage: `url(${image100})`, backgroundSize: 'cover',   backgroundPosition: 'center'  }}>
                <h3><b>PLATA</b></h3>
                {/* <p>Lorem Ipsum</p> */}
              </div>
              <div className="card-body">
                <ul className="list-unstyled">
                  <li>6 Usuarios</li>
                  <hr/>
                  <li>100 Ordenes mensuales</li>
                  <hr/>
                  <li>40 Productos</li>
                  <hr/>
                  <li>Con plataforma para clientes</li>
                  <hr/>
                </ul>
                <div className="card-price">$10.000/M</div>
              </div>
              <div className="card-footer">
                <a href="#" className="btn btn-registerN btn-signup">REGISTARME</a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="card register-box">
            <div className="card-header" style={{ backgroundImage: `url(${image200})`, backgroundSize: 'cover',   backgroundPosition: 'center'  }}>
                <h3><b>ORO</b></h3>
                {/* <p>Lorem Ipsum</p> */}
              </div>
              <div className="card-body">
                <ul className="list-unstyled">
                  <li>12 Usuarios</li>
                  <hr/>
                  <li>Ordenes Ilimitadas</li>
                  <hr/>
                  <li>Productos Ilimitados</li>
                  <hr/>
                  <li>Con plataforma para clientes</li>
                  <hr/>
                </ul>
                <div className="card-price">$30.000/M</div>
              </div>
              <div className="card-footer">
                <a href="#" className="btn btn-registerN btn-signup">REGISTARME</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
