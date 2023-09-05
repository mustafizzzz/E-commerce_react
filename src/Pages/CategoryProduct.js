import React, { useEffect, useState } from 'react'
import Layout from './../Components/Layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const CategoryProduct = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  //get the product
  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`);

      if (data.success) {
        setProduct(data.products);
        setCategory(data.products.category)
      }

    } catch (error) {
      console.log("Error in catch of getProductByCat", error);
      toast.error("Error in catch of getProductByCat")

    }
  }

  useEffect(() => {
    if (params?.slug) {

      getProductByCat();
    }
  }, [params?.slug])
  return (
    <Layout>
      <h1 className='text-center fw-bold'>{category?.name}</h1>
      <div className="conatiner">
        <div className="row">
          <div className="d-flex flex-wrap">
            {product.map((p) => (
              <div className="card m-2 shadow" style={{ width: '18rem' }}>
                <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top h-100" alt={p.name} />
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

export default CategoryProduct