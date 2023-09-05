import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Policy from './Pages/Policy';
import PageNot from './Pages/PageNot';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import Dashboard from './Pages/user/Dashboard';
import PrivateRoute from './Components/Routes/Private';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import Protected from './Components/Routes/Protected';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import CreateCategory from './Pages/Admin/CreateCategory';
import CreateProduct from './Pages/Admin/CreateProduct';
import Users from './Pages/Admin/Users';
import Order from './Pages/user/Order';
import Profile from './Pages/user/Profile';
import Products from './Pages/Admin/Products';
import UpdatProduct from './Pages/Admin/UpdatProduct';
import SearchPage from './Pages/SearchPage';
import ProductDetails from './Pages/ProductDetails';
import Categories from './Pages/Categories';
import CategoryProduct from './Pages/CategoryProduct';
import CartPage from './Pages/CartPage';
import AdminOrder from './Pages/Admin/AdminOrder';





function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/product/:slug' element={<ProductDetails />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/category/:slug' element={<CategoryProduct />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/dashboard' element={<PrivateRoute />} >
          <Route path='user' element={<Dashboard />} />
          <Route path='user/orders' element={<Order />} />
          <Route path='user/profile' element={<Profile />} />
        </Route>

        <Route path='/dashboard' element={<Protected />} >
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/create-category' element={<CreateCategory />} />
          <Route path='admin/create-product' element={<CreateProduct />} />
          <Route path='admin/products/:slug' element={<UpdatProduct />} />
          <Route path='admin/products' element={<Products />} />

          <Route path='admin/users' element={<Users />} />
          <Route path='admin/orders' element={<AdminOrder />} />
        </Route>
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='*' element={<PageNot />} />
      </Routes>

    </>
  );
}

export default App;
