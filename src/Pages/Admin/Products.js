import React, { useEffect, useState } from 'react'
import AdminMenu from '../../Components/Layout/AdminMenu'
import Layout from '../../Components/Layout/Layout'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Products = () => {
  const [products, setProducts] = useState([])
  // const [] = useState([])
  // const [] = useState([])
  // const [] = useState([])

  //gte all products
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product`);
      console.log(data.products)
      if (data.success) {

        setProducts(data.products);
      }
      toast.success("Succesfully get all product")
      console.log("Succesfully get all product in try");



    } catch (error) {
      console.log("Error in getAllProduct catch ", error);
      toast.error("Error in getAllProduct catch")

    }
  }

  useEffect(() => {
    getAllProduct();

    //eslint-disable-next-line
  }, [])



  return (
    <Layout title={"Dashboard- All Products"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2 className='text-center'>All Products List</h2>
            <div className="d-flex flex-wrap">
              {products.map((p) => (
                <Link to={`/dashboard/admin/products/${p.slug}`}
                  key={p._id}
                  className='product-link m-2'>
                  <div className="card h-100" style={{ width: '18rem' }}>
                    <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                    </div>
                  </div>
                </Link>

              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )


}
export default Products