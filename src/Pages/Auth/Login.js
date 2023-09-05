import React from 'react'
import Layout from './../../Components/Layout/Layout';
import { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../Contex/auth';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const location = useLocation();
  //form function
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/login`, { email, password });
      if (res.data && res.data.success) {
        toast.success("Login Sucessfull", res.data.success);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        });
        localStorage.setItem('auth', JSON.stringify(res.data))
        navigate(location.state || '/')
      } else {
        toast.error("Invalid Password", res.data.messgae)

      }

    } catch (error) {
      console.warn(error.message);
      toast.error("Something in Login submission")

    }
  }



  return (
    <Layout>
      <div className="container register border mt-5">
        <h1>Login Page</h1>
        <div className='row w-50'>
          <div className="col-12 d-block">
            <form onSubmit={handelSubmit}>

              <div className="mb-3">
                <label htmlFor="exampleInputemail" className="form-label">Email</label>
                <input type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" required />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password"
                  onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" id="exampleInputPassword1" required />
              </div>

              <button type="submit"
                className="btn btn-primary">Login</button>

              <button type="button"
                className="btn btn-primary ms-2" onClick={() => { navigate('/forgot-password') }}>Forgot Password</button>
            </form>
          </div>

        </div>
      </div>

    </Layout>
  )
}

export default Login