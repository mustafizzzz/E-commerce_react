import React from 'react'
import Layout from './../../Components/Layout/Layout';
import AdminMenu from '../../Components/Layout/AdminMenu';
import { useAuth } from '../../Contex/auth';

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"AdminDashboard - Ecommerce App"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Admin name: {auth?.user?.name}</h3>
              <h3>Admin email: {auth?.user?.email}</h3>
              <h3>Admin contact: {auth?.user?.phone}</h3>

            </div>
          </div>
        </div>
      </div>
    </Layout >
  )
}

export default AdminDashboard