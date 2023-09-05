import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'
import { useAuth } from '../../Contex/auth';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Profile = () => {
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  //context
  const [auth, setAuth] = useAuth();

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/auth/profile`, {
        name,
        email,
        phone,
        address,
      });
      if (data?.success) {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem('auth');
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem('auth', JSON.stringify(ls));
        toast.success("Updated Successfully");


      }
    } catch (error) {
      console.warn("Something in profile  ", error);
      toast.error("Something in profile")

    }

  }

  //get User Data
  useEffect(() => {
    const { name, email, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);

  }, [auth?.user])

  return (
    <>
      <Layout title={"Dashboard- Your Profile"}>
        <div className="container-fluid p-3 m-3">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <h1>User Profile</h1>

              <div className="col-12 d-block">
                <form onSubmit={handelSubmit}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputname" className="form-label">Name</label>
                    <input type="text" value={name}
                      onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputEmail1" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputemail" className="form-label">Email</label>
                    <input type="email" value={email}
                      onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1"

                      disabled />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="exampleInputphone" className="form-label">Phone</label>
                    <input type="text" value={phone}
                      onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputEmail1" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputadsress" className="form-label">Address</label>
                    <input type="text"
                      onChange={(e) => setAddress(e.target.value)} value={address} className="form-control" id="exampleInputEmail1" />
                  </div>
                  <button type="submit"
                    className="btn btn-primary">Update</button>
                </form>
              </div>


            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Profile