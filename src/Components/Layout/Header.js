import React from 'react'
import { NavLink, Link } from "react-router-dom";
import { GiShoppingBag } from 'react-icons/gi';
import { useAuth } from '../../Contex/auth';
import { toast } from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';
import useCategory from './../../hooks/useCategory';
import { useCart } from '../../Contex/Cart';
import { Badge } from 'antd';



const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart, setCart] = useCart();

  const handelLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    })
    localStorage.removeItem("auth");
    console.log("Auth deleted");
    toast.success("Logout Sucessfully")
    console.log(typeof (auth.user.role));
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-sm-top">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <GiShoppingBag className='me-3 fs-2' /><Link to='/' className="navbar-brand">E-commerce</Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to='/' className="nav-link" aria-current="page">Home</NavLink>
              </li>

              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown"
                  to='/categories'>
                  Categories
                </NavLink>

                <ul className="dropdown-menu">
                  <Link className="dropdown-item"
                    to={`/categories`} >
                    All Category
                  </Link>
                  {categories?.map((c) => (
                    <li>
                      <Link className="dropdown-item"
                        to={`/category/${c.slug}`} >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {
                !auth.user ? (<>
                  <li className="nav-item">
                    <NavLink to='/register' className="nav-link">Register</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to='/login'
                      className="nav-link">Login</NavLink>
                  </li>
                </>) : (<>
                  <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown">
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><NavLink to={`/dashboard/${auth?.user?.role === "1" ? 'admin' : 'user'}`} className="dropdown-item" >Dashboard {auth.user.role}</NavLink></li>
                      <li><NavLink to='/login' className="dropdown-item"
                        onClick={handelLogout}>Logout</NavLink></li>
                    </ul>
                  </li>


                </>)
              }

              <li className="nav-item m-2">
                <Badge count={cart.length} >
                  <NavLink to='/cart' className="nav-link fs-5">
                    Cart
                  </NavLink>
                </Badge>

              </li>
            </ul>
          </div>
        </div >
      </nav >

    </>
  )
}

export default Header