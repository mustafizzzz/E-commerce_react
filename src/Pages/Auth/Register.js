import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';





const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  //form function
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
        answer
      });
      if (res.data && res.data.success) {
        toast.success(res.data && res.data.message)
        navigate('/login')
      } else {
        toast.error("Error in if else", res.data.messgae)

      }

    } catch (error) {
      console.warn(error);
      toast.error("Something in register submission")

    }

  }



  return (
    <Layout title={'Register - Ecommerece app'}>

      {/* Page design */}
      <div className="container register border mt-5">
        <h1>Register Page</h1>
        <div className='row w-50'>
          <div className="col-12 d-block">
            <form onSubmit={handelSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputname" className="form-label">Name</label>
                <input type="text" value={name}
                  onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputEmail1" required />
              </div>
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
              <div className="mb-3">
                <label htmlFor="exampleInputphone" className="form-label">Phone</label>
                <input type="text" value={phone}
                  onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputEmail1" required />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputadsress" className="form-label">Address</label>
                <input type="text"
                  onChange={(e) => setAddress(e.target.value)} value={address} className="form-control" id="exampleInputEmail1" required />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputAnswer1" className="form-label">Your Friend Name</label>
                <input type="text"
                  onChange={(e) => setAnswer(e.target.value)} value={answer} className="form-control"
                  placeholder='Answer' id="exampleInputEmail1" required />
              </div>
              <button type="submit"

                className="btn btn-primary">Submit</button>
            </form>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default Register