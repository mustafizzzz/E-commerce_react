import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'
import axios from 'axios';
import { useAuth } from '../../Contex/auth';
import moment from 'moment';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  //getorders
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`/api/v1/auth/orders`);
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
  return (
    <Layout title={"Dashboard- Your Orders"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h2 className='text-center fw-bold'>All Orders</h2>
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
                            <th>{o?.status}</th>
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
      </div>
    </Layout>
  )
}

export default Order