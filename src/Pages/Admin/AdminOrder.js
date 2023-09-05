import React, { useEffect, useState } from 'react'
import AdminMenu from '../../Components/Layout/AdminMenu'
import Layout from './../../Components/Layout/Layout';
import moment from 'moment';
import { useAuth } from '../../Contex/auth';
import axios from 'axios';
import { Select } from 'antd';
import { toast } from 'react-hot-toast';
const { Option } = Select;


const AdminOrder = () => {

  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState(["Nor Process", "Processing", "Shipped", "Deliverd", "Cancled"])
  const [changeStatus, setChangeStatus] = useState([]);
  const [auth, setAuth] = useAuth();

  //getorders
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`/api/v1/auth/all-orders`);
      setOrders(data);

    } catch (error) {

      console.log("Erro in get Order catch ", error);

    }

  }

  //use effect
  useEffect(() => {
    if (auth?.token)
      getOrders();

  }, [auth?.token])

  //handle chnage
  const handelChange = async (oid, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${oid}`, { status: value });
      getOrders();
      toast.success("Update status")


    } catch (error) {
      console.log(error);
      toast.error("Error in Change the status");

    }

  }

  return (
    <Layout title={"All order data"}>
      <div className="row mt-2">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className='text-center fw-bold'>All Orders</h1>
          <div className="mb-2 shadow">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Sr No</th>
                  <th scope="col">Status</th>
                  <th scope="col">Buyer</th>
                  <th scope="col">Dates</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Qunatity</th>
                </tr>
              </thead>
              <tbody>
                {
                  orders?.map((o, i) => {
                    return (
                      <>
                        <tr>
                          <th>{i + 1}</th>
                          <th>
                            <Select bordered={false}
                              onChange={(value) => handelChange(o._id, value)}
                              defaultValue={o?.status}>
                              {
                                status.map((s, i) => (
                                  <Option key={i} value={s}>{s}</Option>
                                ))
                              }
                            </Select>
                          </th>
                          <th>{o?.buyers?.name}</th>
                          <th>{moment(o?.createdAt).fromNow()}</th>
                          <th>{o?.payment.success ? "Success" : "Failed"}</th>
                          <th>{o?.products.length}</th>
                        </tr>


                        <div className="container">
                          <div className="row">
                            <div className="col-md-12">
                              {
                                o?.products.map((p, i) => (

                                  <div div className="row mb-2 card flex-row">
                                    <div className="col-md-4 m-2">
                                      <img src={`/api/v1/product/product-photo/${p._id}`}
                                        className="img-fluid rounded" alt={p.name}
                                        style={{ maxHeight: '8rem' }} />
                                    </div>
                                    <div className="col-md-4 ms-4 p-2">
                                      <h4>
                                        {p.name}
                                      </h4>
                                      <p>{p.description}</p>
                                      <h4>Price:{p.price}</h4>

                                    </div>
                                  </div>
                                ))
                              }
                            </div>
                          </div>


                        </div>
                      </>
                    )
                  })
                }


              </tbody>
            </table>
          </div>


        </div>

      </div>
    </Layout>
  )
}

export default AdminOrder