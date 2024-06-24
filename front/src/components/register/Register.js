import React, { useState } from 'react';
import './register.css';
import image50 from '../../assets/50.png';
import image100 from '../../assets/100.png';
import image200 from '../../assets/200.png';
import { auth, provider, signInWithPopup } from '../autentication/firebase';

export default function Register() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleRegisterClick = (plan) => {
    setSelectedPlan(plan);
  };

  const handleBackClick = () => {
    setSelectedPlan(null);
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseToken = await result.user.getIdToken();

      console.log('User signed in: ', result.user);

      // Envía el token de Firebase a tu API backend
      fetch('http://localhost:8000/api/registerWgoogle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${firebaseToken}`
        },
        body: JSON.stringify({
          // otros datos si es necesario
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      
    } catch (error) {
      console.error('Error signing in with Google: ', error);
    }
  };

  return (
    <div className="register-b">
      <div className="container text-center">
        {!selectedPlan ? (
          <div className="row align-items-center animate-down">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="card register-box">
                <div className="card-header" style={{ backgroundImage: `url(${image50})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <h3><b>BASICO</b></h3>
                </div>
                <div className="card-body">
                  <ul className="list-unstyled">
                    <li>3 Usuarios</li>
                    <hr />
                    <li>50 Ordenes mensuales</li>
                    <hr />
                    <li>20 Productos</li>
                    <hr />
                    <li>Con plataforma para clientes</li>
                    <hr />
                  </ul>
                  <div className="card-price">GRATIS</div>
                </div>
                <div className="card-footer">
                  <button onClick={() => handleRegisterClick('BASICO')} className="btn btn-registerN btn-signup">REGISTRARME</button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="card register-box">
                <div className="card-header" style={{ backgroundImage: `url(${image100})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <h3><b>PLATA</b></h3>
                </div>
                <div className="card-body">
                  <ul className="list-unstyled">
                    <li>6 Usuarios</li>
                    <hr />
                    <li>100 Ordenes mensuales</li>
                    <hr />
                    <li>40 Productos</li>
                    <hr />
                    <li>Con plataforma para clientes</li>
                    <hr />
                  </ul>
                  <div className="card-price">$10.000/M</div>
                </div>
                <div className="card-footer">
                  <button onClick={() => handleRegisterClick('PLATA')} className="btn btn-registerN btn-signup">REGISTRARME</button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="card register-box">
                <div className="card-header" style={{ backgroundImage: `url(${image200})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <h3><b>ORO</b></h3>
                </div>
                <div className="card-body">
                  <ul className="list-unstyled">
                    <li>12 Usuarios</li>
                    <hr />
                    <li>Ordenes Ilimitadas</li>
                    <hr />
                    <li>Productos Ilimitados</li>
                    <hr />
                    <li>Con plataforma para clientes</li>
                    <hr />
                  </ul>
                  <div className="card-price">$30.000/M</div>
                </div>
                <div className="card-footer">
                  <button onClick={() => handleRegisterClick('ORO')} className="btn btn-registerN btn-signup">REGISTRARME</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="register-form animate-up">
            <div className="form-header">
              <button onClick={handleBackClick} className="btn btn-back"><i className="fas fa-arrow-left"></i></button>
              <h2>Formulario de Registro - Plan {selectedPlan}</h2>
            </div>
            <form>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" />
              </div>
              <button type="submit" className="btn btn-primary">Registrar</button>
            </form>
            <hr />
            <button onClick={handleGoogleSignIn} className="btn btn-danger">Registrarse con Google</button>
          </div>
        )}
      </div>
    </div>
  );
}
