import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Navbar from './Components/Navbar';
import Login from './pages/Login/index'
import {AuthProvider} from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Register from './pages/Register/index';
import Admin from './pages/Admin';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import ProductInfo from './pages/ProductInfo';
import Cart from './pages/Cart';
import Complete from './pages/Complete';


function App() {
  return (
    <>
      {/* todos os elementos do AuthProvider tem acesso aos estados que ele dispoem */}
      <AuthProvider>
        <Navbar></Navbar>
         {/* Router funciona como um Switch da aplicação,ele gerencia pra saber quando deve ser exibida cada rota* */}
        <Routes>
               {/* Route tem o campo path path(caminhi) e o campo element, pra saber qual elemento sera exibido */}
             <Route path='/' element= {
                <ProtectedRoute>
                    <Home/>
                </ProtectedRoute>}>
             </Route>
             <Route path='/product/:id' element= {
                <ProtectedRoute>
                    <ProductInfo/>
                </ProtectedRoute>}></Route>
             <Route path='/login' element={<Login/>}></Route>
             <Route path='/register' element={<Register/>}></Route>
             <Route path='/admin' element={
                <ProtectedRoute>
                    <Admin/>
                </ProtectedRoute>}
            ></Route>
            <Route path='/add-product' element={
                <ProtectedRoute>
                    <AddProduct/>
                </ProtectedRoute>}
            ></Route>
            <Route path='/edit-product/:id' element={
                <ProtectedRoute>
                    <EditProduct/>
                </ProtectedRoute>}
            ></Route>
            <Route path='/cart' element={
                <ProtectedRoute>
                    <Cart/>
                </ProtectedRoute>}
            ></Route>
            <Route path='/complete' element={
                <ProtectedRoute>
                    <Complete/>
                </ProtectedRoute>}
            ></Route>
        </Routes>
      </AuthProvider>  
    </>
  );
}

export default App;
