import AdminMenu from '../../Components/Layout/AdminMenu'
import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Select } from "antd";
import { useNavigate, useParams } from 'react-router-dom';
const { Option } = Select

const UpdatProduct = () => {

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category');
      console.log(data);
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

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/single-product/${params.slug}`);
      if (data.success) {

        setId(data.product._id);
        setCategory(data.product.category._id);
        setName(data.product.name);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        setShipping(data.product.shipping);

      }
      console.log("Setted all vlaue in field try");

    } catch (error) {
      console.log("Error in getSingleProduct catch ", error);
      toast.error("Error in getSingleProduct catch")

    }
  }

  useEffect(() => {
    getAllCategory();
    //est int-disable-next-line
  }, [])

  useEffect(() => {
    getSingleProduct();
    //est int-disable-next-line
  }, [])

  //create porduct Update function
  const handelUpdatePorduct = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("shipping", shipping);
      productData.append("category", category);
      // console.log(productData);

      const { data } = await axios.put(`/api/v1/product//update-product/${id}`, productData)
      if (data.success) {
        console.log("Product update Successfully: ", data);
        toast.success("Product Update Successfully");
        navigate('/dashboard/admin/products')
      } else {
        toast.error("Error in else Update data");
        console.log(data.message);
      }

    } catch (error) {
      console.log("Error in handelUpdatePorduct catch ", error);
      toast.error("Error in handelUpdatePorduct catch")

    }

  }

  //handelDelete
  const handelDeletePorduct = async () => {
    try {
      let answer = window.prompt(`Delete ${name} permanently`);
      if (!answer)
        return
      const { data } = await axios.delete(`/api/v1/product/delete-product/${id}`);

      navigate('/dashboard/admin/products');
      toast.success("Product Delete Successfully");

    } catch (error) {
      console.log("Error in handelDeletePorduct catch ", error);
      toast.error("Error in handelDeletePorduct catch")

    }


  }




  return (
    <Layout title={"Dashboard- UpdateProduct"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select bordered={false} placeholder="Select a Category" size='large' showSearch className='form-select mb-3' onChange={(value) => {
                setCategory(value)
              }}
                value={category}>
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}

              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12" >
                  {photo ? photo.name : "Uplode Photo"}
                  <input type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => { setPhoto(e.target.files[0]) }}
                    hidden />
                </label>

              </div>

              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img src={URL.createObjectURL(photo)} className='img-fluid rounded'
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img src={`/api/v1/product/product-photo/${id}`} className='img-fluid rounded'
                    />
                  </div>
                )}
              </div>

              <div className="mb-3">
                <input type="text"
                  value={name}
                  placeholder='Write a name' className='form-control'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <textarea type="text"
                  value={description}
                  placeholder='Write a description' className='form-control'
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input type="text"
                  value={price}
                  placeholder='Write a price' className='form-control'
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input type='number'
                  value={quantity}
                  placeholder='Write a quantity' className='form-control'
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <Select bordered={false} placeholder="Select Shipping" size='large' showSearch
                  className='form-select mb-3'
                  onChange={(value) => { setShipping(value) }}
                  value={shipping ? '1' : '0'}
                >

                  <Option value="0">
                    No
                  </Option>

                  <Option value="1">
                    Yes
                  </Option>

                </Select>
              </div>
              <div className="mb-3  d-flex justify-content-between">
                <button
                  className='btn btn-primary'
                  onClick={handelUpdatePorduct}>
                  Update Porduct
                </button>

                <button
                  className='btn btn-danger'
                  onClick={handelDeletePorduct}>
                  Delete Porduct
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout >
  )
}

export default UpdatProduct;