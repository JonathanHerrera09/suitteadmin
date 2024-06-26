import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowProduct from './components/show/ShowProduct.js';
import CreateProduct from './components/create/CreateProduct.js';
import EditProduct from './components/edit/EditProduct.js';
import Kitchen from './components/kitchen/Kitchen.js';
import KitchenDetalle from './components/kitchen/KitchenDetalle.js';
import Delivery from './components/delivery/Delivery.js';
import Login from './components/login/Login.js';
import Sale from './components/sale/Sale.js';
import ProductS from './components/product/ProductS.js';
import FromDS from './components/formDelivery/FromDS.js';
import ProductC from './components/product/create/ProductC.js';
import ProductE from './components/product/edit/ProductE.js';
import FromDSC from './components/formDelivery/create/FromDSC.js';
import FromDSE from './components/formDelivery/edit/FromDSE.js';
import Banners from './components/banner/Banners.js';
import BannerC from './components/banner/create/BannerC.js';
import BannerE from './components/banner/edit/BannerE.js';
import Config from './components/config/Config.js';
import Categorys from './components/category/Category.js';
import CategoryC from './components/category/create/CategoryC.js';
import CategoryE from './components/category/edit/CategoryE.js';
import Register from './components/register/Register.js';
import ReportSale from './components/report/ReportSale.js';
import ReportProducts from './components/report/ReportProduct.js';
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
          <Route path='/:kitchen/categorys' element={ <Categorys/> } />
          <Route path='/:kitchen/categoryC' element={ <CategoryC/> } />
          <Route path='/:kitchen/categoryE/:id' element={ <CategoryE/> } />
          <Route path='/:kitchen/config' element={ <Config/> } />
          <Route path='/:kitchen/reports' element={ <ReportSale/> } />
          <Route path='/:kitchen/reportsp' element={ <ReportProducts/> } />
          <Route path='/Login' element={ <Login/> } />
          <Route path='/Register' element={ <Register/> } />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
