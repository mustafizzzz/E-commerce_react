import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({})
  const [relate, setrelated] = useState([])
  const navigate = useNavigate();
  //inuitial p details
  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }

  }, [params?.slug])

  //getProduct the click product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/single-product/${params.slug}`)
      setProduct(data?.product)
      similarProduct(data?.product._id, data?.product.category._id);
      toast.success("Successfully get the single product")

    } catch (error) {
      console.log("Error in getProduct of Product Details catch ", error);
      toast.error("Error in getProduct of Product Details catch")

    }

  }

  //get Similar product
  const similarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
      setrelated(data?.products)

    } catch (error) {

      console.log("Error in similarProduct of Product Details catch ", error);
      toast.error("Error in similarProduct of Product Details catch")


    }

  }

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row mt-3 p-2">
          <div className="col-md-6 border border-danger ">
            <img src={`/api/v1/product/product-photo/${product._id}`} className="img-fluid" alt={product.name}
              style={{ maxWidth: '50vh' }} />
          </div>
          <div className="col-md-6">
            <h2>Product Details</h2>
            <h5>Name: {product.name}</h5>
            <h5>Description: {product.description}</h5>
            <h5>category: {product?.category?.name}</h5>
            <h5>Price: ${product.price}</h5>
            <button className='btn btn-secondary mt-2 btn-lg'>Add to Cart</button>
          </div>
        </div>

        <div className="row mt-3 p-2">
          <h2 className='text-center fw-bold'>
            Similar product
          </h2>
          {relate.length < 1 && (<p className='text-center fw-bold'>No Similar Product Found</p>)}
          <div className="col-md-12 border
          border-info d-flex flex-wrap">
            {relate.map((p) => (
              <div className="card m-2 shadow " style={{ width: '40vh' }}>
                <img src={`/api/v1/product/product-photo/${p._id}`} className="img-fluid card-img-top h-100" alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <p className="card-text">${p.price}</p>

                  <button className='btn btn-primary ms-1'
                    onClick={() => navigate(`/product/${p.slug}`)}>
                    More Details
                  </button>
                  <button className='btn btn-secondary ms-1'>
                    Add to Cart
                  </button>
                </div>
              </div>

            ))}
          </div>


        </div>

      </div>

    </Layout>
  )
}

export default ProductDetails