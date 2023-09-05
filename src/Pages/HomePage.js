import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Checkbox, Radio } from 'antd';
import { Prices } from './../Components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Contex/Cart';

const HomePage = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [check, setCheck] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();


  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-count`);
      setTotal(data?.total);

    } catch (error) {
      console.log("Error in getTotal catch ", error);
      toast.error("Error in getTotal catch")


    }

  }

  //get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-perpage/${page}`);
      setLoading(false)
      if (data.success) {

        setProducts(data.products);
      }
      toast.success("Succesfully get all product")
      console.log("Succesfully get all product in try");



    } catch (error) {
      setLoading(false)
      console.log("Error in getAllProduct catch ", error);
      toast.error("Error in getAllProduct catch")

    }
  }

  //get all Category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category');
      if (data.success) {
        setCategories(data.category);
      }
      toast.success("Succesfully get all category")
      console.log("Succesfully setted categories in try");

    } catch (error) {
      console.log("Error in getAllCategory catch ", error);
      toast.error("Error in getAllCategory catch")
    }

  }

  //loade more
  const loadeMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-perpage/${page}`);
      setLoading(false)
      console.log("In Loademore", data.products);
      setProducts([...products, ...data.products]);

    } catch (error) {
      setLoading(false)
      console.log("Error in loadeMore catch ", error);
      toast.error("Error in loadeMore catch")

    }

  }

  useEffect(() => {
    if (page === 1) {

      return;
    }
    loadeMore();

  }, [page])

  //handel filter
  const handelFilter = async (value, id) => {
    let all = [...check];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setCheck(all);
  }

  //fecth filter product
  const fetchFilters = async () => {
    try {
      const { data } = await axios.post(`/api/v1/product/product-filterd`, { check, radio });
      console.log(check, radio);
      setProducts(data.products);
    } catch (error) {
      console.log("Error in fetchFilters catch ", error);
      toast.error("Error in fetchFilters catch")

    }
  }

  //calling by use effect
  useEffect(() => {

    getAllCategory();
    getTotal();
  }, [])

  useEffect(() => {
    if (!check.length || !radio.length) getAllProducts();
  }, [check.length, radio.length]);

  useEffect(() => {
    if (check.length || radio.length) {
      fetchFilters();
    }

  }, [check, radio])




  return (
    <Layout title={'All product-Best offer'}>
      <div className="container-fluid mt-3">
        <div className="row border">

          <div className="col-md-3">
            {/* {JSON.stringify(check, null, 4)}
            {JSON.stringify(radio, null, 4)} */}

            <h2 className="text-center fw-bold">Filters</h2>

            <h6 className="text-center mt-3">By Category</h6>
            <div className="d-flex flex-cloumn p-1 border">
              {categories?.map((c) => (
                <Checkbox key={c._id}
                  onChange={(e) => handelFilter(e.target.checked, c._id)}>
                  {c.name}
                </Checkbox>

              ))}
            </div>
            {/* Price filter */}
            <h6 className="text-center mt-5">By Price</h6>
            <div className="d-flex flex-cloumn p-1 border">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices.map((pr) => (
                  <div key={pr._id}>
                    <Radio value={pr.array}>{pr.name}</Radio>
                  </div>

                ))}
              </Radio.Group>
            </div>

            <div className="d-flex flex-cloumn p-1 mt-1">
              <button className='btn btn-danger'
                onClick={() => window.location.reload()}>Reset Filters</button>
            </div>

          </div>

          <div className="col-md-9 border border-primary">
            <h1 className='text-center'>All Products</h1>
            <div className="d-flex flex-wrap">
              {products.map((p) => (
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
                    <button className='btn btn-secondary ms-1'
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem('cart', JSON.stringify([...cart, p]));
                        toast.success(`${p.name} Product Added to cart`)
                      }}>
                      Add to Cart
                    </button>
                  </div>
                </div>

              ))}
            </div>
            <div className='m-2 p-2 '>{products && products.length < total && (<button className='btn btn-warning text-center'
              onClick={(e) => {
                e.preventDefault()
                setPage(page + 1)
              }}>{loading ? "Loading..." : "Show More"}</button>)}</div>
          </div>

        </div>
      </div>

    </Layout >
  )

}


export default HomePage