import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './login.css';


/* const endpoint ='http://localhost:8000/api/login'; */
/* const endpoint =process.env.REACT_APP_API_URL+'/login'; */
const endpoint ='https://admin.tumenuonline.com/api/login';

const Login = () => {
  const [kitchen, setKitchen] = useState('');
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate()

  const log = async (e) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    const credentials = {
      withCredentials: true
    };
    e.preventDefault();
    const login = await axios.post(endpoint, {
      kitchen: kitchen,
      user: user,
      password: pass,
    }, {
      headers: headers,
      ...credentials
    });
    if(login.data){
      localStorage.setItem('kitchen', login.data.kitchen);
      navigate('/'+login.data.kitchen);
    }
  };

  return (
    <div className="login-b">
      <div className="login-container">
        <img className="logoL" src="../../favicon.png" alt="Logo" />
        <div className="login-box">
          <div className="logo-container">
            <h2>Login</h2>
          </div>
          <form onSubmit={log}>
            <div className="user-box">
              <input
                type="text"
                value={kitchen}
                onChange={(e) => setKitchen(e.target.value)}
                name="kitchen"
                required
              />
              <label> <i className="fas fa-chess-rook"></i> Cocina</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                name="user"
                required
              />
              <label><i className="fas fa-user"></i> Usuario </label>
            </div>
            <div className="user-box">
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                name="pass"
                required
              />
              <label> <i className="fas fa-lock"></i> Contraseña</label>
            </div>
            <button type="submit" className="btn btn-outline-light btn-custom-width">
              Entrar
            </button>
            <a href="/register"><h5>Registarme</h5></a>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
