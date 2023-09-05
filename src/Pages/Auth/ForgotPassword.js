import React from 'react'
import Layout from '../../Components/Layout/Layout';
import { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [answer, setanswer] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  //form function
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/forgot-password`, {
        email,
        newPassword,
        answer
      });
      if (res.data && res.data.success) {
        toast.success("Changes Sucessfull", res.data.success);
        navigate('/login')
      } else {
        toast.error("Error in if else", res.data.messgae)

      }

    } catch (error) {
      console.warn(error.message);
      toast.error("Something in Forgot Password submission front")

    }
  }




  return (
    <Layout title={"Forgot Password"}>
      <div className="container register border mt-5">
        <h1>Reset Password</h1>
        <div className='row w-50'>
          <div className="col-12 d-block">
            <form onSubmit={handelSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputemail" className="form-label">Email</label>
                <input type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" required />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputemail" className="form-label">Answer</label>
                <input type="text" value={answer}
                  onChange={(e) => setanswer(e.target.value)} className="form-control"
                  placeholder="Your Friend Name"
                  id="exampleInputAnswer1" required />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
                <input type="password"
                  onChange={(e) => setnewPassword(e.target.value)} value={newPassword} className="form-control" id="exampleInputPassword1" required />
              </div>

              <button type="submit"
                className="btn btn-primary w-100">Reset</button>
            </form>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default ForgotPassword