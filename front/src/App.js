import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import ShowProduct from './components/show/ShowProduct';
import CreateProduct from './components/create/CreateProduct';
import EditProduct from './components/edit/EditProduct';
import Kitchen from './components/kitchen/Kitchen';
import KitchenDetalle from './components/kitchen/KitchenDetalle';
import Delivery from './components/delivery/Delivery';
import Login from './components/login/Login';
import Sale from './components/sale/Sale';
import ProductS from './components/product/ProductS';
import FromDS from './components/formDelivery/FromDS';
import ProductC from './components/product/create/ProductC';
import ProductE from './components/product/edit/ProductE';
import FromDSC from './components/formDelivery/create/FromDSC';
import FromDSE from './components/formDelivery/edit/FromDSE';
import Banners from './components/banner/Banners';
import BannerC from './components/banner/create/BannerC';
import BannerE from './components/banner/edit/BannerE';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import 'bootstrap';

function App() {
  // Agregar el enlace a la hoja de estilos de Font Awesome aquí
  const linkToFontAwesome = document.createElement('link');
  linkToFontAwesome.rel = 'stylesheet';
  linkToFontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
  document.head.appendChild(linkToFontAwesome);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/:kitchen/' element={ <ShowProduct/> } />
          <Route path='/:kitchen/create' element={ <CreateProduct/> } />
          <Route path='/:kitchen/edit/:id' element={ <EditProduct/> } />
          <Route path='/:kitchen/Kitchen' element={ <Kitchen/> } />
          <Route path='/:kitchen/Kitchenedit/:id' element={ <KitchenDetalle/> } />
          <Route path='/:kitchen/Delivery' element={ <Delivery/> } />
          <Route path='/:kitchen/clientP' element={ <Sale/> } />
          <Route path='/:kitchen/products' element={ <ProductS/> } />
          <Route path='/:kitchen/formDelivery' element={ <FromDS/> } />
          <Route path='/:kitchen/productC' element={ <ProductC/> } />
          <Route path='/:kitchen/ProductE/:id' element={ <ProductE/> } />
          <Route path='/:kitchen/fromDeliveryC' element={ <FromDSC/> } />
          <Route path='/:kitchen/fromDeliveryE/:id' element={ <FromDSE/> } />
          <Route path='/:kitchen/banners' element={ <Banners/> } />
          <Route path='/:kitchen/bannerC' element={ <BannerC/> } />
          <Route path='/:kitchen/bannerE/:id' element={ <BannerE/> } />
          <Route path='/Login' element={ <Login/> } />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
