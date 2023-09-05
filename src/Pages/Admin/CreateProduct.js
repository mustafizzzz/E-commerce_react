import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Select } from "antd";
import { useNavigate } from 'react-router-dom';

const { Option } = Select
const CreateProduct = () => {

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const navigate = useNavigate();

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
      console.log("Error in CreateCategory catch ", error);
      toast.error("Error in CreateCategory catch")
    }

  }

  useEffect(() => {
    getAllCategory();
  }, [])

  //create porduct function
  const handelCreatePorduct = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("shipping", shipping);
      productData.append("category", category);
      // console.log(productData);

      const { data } = await axios.post(`/api/v1/product/create-product`, productData)
      if (data.success) {
        console.log("Product Created Successfully: ", data);
        toast.success("Product Created Successfully");
        navigate('/dashboard/admin/products')
      } else {
        toast.error("Error in else creating data");
        console.log(data.message);
      }

    } catch (error) {
      console.log("Error in handelCreatePorduct catch ", error);
      toast.error("Error in handelCreatePorduct catch")

    }

  }


  return (
    <>
      <Layout title={"Dashboard- CreateProduct"}>
        <div className="container-fluid p-3 m-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Create Product</h1>
              <div className="m-1 w-75">
                <Select bordered={false} placeholder="Select a Category" size='large' showSearch className='form-select mb-3' onChange={(value) => {
                  setCategory(value)
                }}>
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
                  {photo && (
                    <div className="text-center">
                      <img src={URL.createObjectURL(photo)} className='img-fluid rounded' />
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
                    onChange={(value) => { setShipping(value) }}>

                    <Option value="0">
                      No
                    </Option>

                    <Option value="1">
                      Yes
                    </Option>

                  </Select>
                </div>
                <div className="mb-3">
                  <button
                    className='btn btn-primary'
                    onClick={handelCreatePorduct}>
                    Create Porduct
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </Layout >
    </>
  )
}

export default CreateProduct