import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout';
import { useCart } from '../Contex/Cart';
import { useAuth } from '../Contex/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';


const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  //total proce 
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => { total = total + Math.floor(item.price) });

      return total;
    } catch (error) {
      console.log("Error in Total Price");

    }

  }

  //delete items
  const removeCartItem = async (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex(item => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem('cart', JSON.stringify(myCart))

    } catch (error) {
      console.log("Erro in removeCartItem catch ", error);
      toast.error("Erro in removeCartItem catch ")

    }
  }

  //gte paymnet gatway token

  const getToken = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/baraintree/token`)
      setClientToken(data?.clientToken);

    } catch (error) {
      console.log("Erro in getToken catch ", error);
      toast.error("Erro in getToken catch ")

    }
  }

  useEffect(() => {
    getToken()
  }, [auth?.token])

  //handel apyment 
  const handelPayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`/api/v1/product/baraintree/payment`, {
        nonce, cart
      });
      setLoading(false);
      localStorage.removeItem('cart')
      setCart([])
      navigate('/dashboard/user/orders');
      toast.success("Payment Completed Sucessfully")

    } catch (error) {
      console.log(error);
      setLoading(false)

    }

  }

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h1 className='text-center bg-light p-3 mb-2'>
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className='text-center'>{cart?.length >= 1 ? `Your have ${cart?.length} in your Cart ${auth?.token ? "" : "Please Login to Add items"
              }` : "Your Cart is Empty"}</h4>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            {
              cart?.map((p) => (

                <div div className="row mb-2 card flex-row">
                  <div className="col-md-4">
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
                    <button className='btn btn-danger'
                      onClick={() => removeCartItem(p._id)}>Remove</button>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="col-md-4 text-center" >
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4 className='fw-bold'>Total: ${totalPrice()}</h4>

            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button className='btn btn-outline-warning'
                    onClick={
                      () => navigate('/dashboard/user/profile')
                    }>Update Address</button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {
                  auth?.token ? (
                    <button className='btn btn-outline-warning'
                      onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                  ) : (
                    <button className='btn btn-outline-warning'
                      onClick={() => navigate('/login', {
                        state: "/cart",
                      }
                      )}>Please Login</button>
                  )

                }
              </div>

            )}
            <div className="mt-2">
              {
                !clientToken || !cart?.length ? ("") : (
                  <>
                    <DropIn
                      options={
                        {
                          authorization: clientToken,
                          paypal: {
                            flow: 'vault',
                          },
                        }
                      }
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button className='btn btn-success mb-2'
                      onClick={handelPayment}
                      disabled={loading || !instance || !auth?.user?.address
                      }
                    >{loading ? "Processing..." : "Make Payment"}</button>
                  </>
                )
              }

            </div>



          </div>
        </div>
      </div>
    </Layout >
  )
}

export default CartPage