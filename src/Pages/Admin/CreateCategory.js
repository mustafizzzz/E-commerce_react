import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import InputForm from '../../Components/Form/InputForm';
import { Modal } from 'antd';


const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updated, setUpdated] = useState("");


  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category');
      console.log(data.category)
      if (data.success) {
        setCategories(data.category)
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
    //eslint-disable-next-line
  }, [])

  //create category
  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log("Handle submit click");
    try {
      const { data } = await axios.post('/api/v1/category/create-category', { name })
      if (data?.success) {
        toast.success(`${name} is created successful`)
        getAllCategory();
        console.log(`${name} is created successful in handelsubmit`);
      } else {
        toast.error("Error in handleSubmit try else");
        console.log("Error in handleSubmit try else");

      }
    } catch (error) {
      console.log("Error in handleSubmit catch ", error);
      toast.error("Error in handleSubmit catch")
    }
  }


  //update submit
  const handelUpdateSubmit = async (e) => {
    e.preventDefault();
    console.log("Value of ID: ", selected._id);
    try {
      const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: updated })
      if (data?.success) {
        toast.success(`${updated} is Updated successful`)
        setSelected(null);
        setUpdated("")
        setVisible(false);
        getAllCategory();
        console.log(`${updated} is Updated successful in handelsubmit`);
      } else {
        toast.error("Error in handleSubmit try else");
        console.log("Error in handleSubmit try else");


      }
    } catch (error) {
      console.log("Error in handelUpdateSubmit catch ", error);
      toast.error("Error in handelUpdateSubmit catch")

    }
  }

  //delete handel
  const handelDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/v1/category/delete-category/${id}`)
      if (data?.success) {
        setVisible(false);
        getAllCategory();
      } else {
        toast.error("Error in handelDelete try else");
        console.log("Error in handelDelete try else");


      }
    } catch (error) {
      console.log("Error in handelDelete catch ", error);
      toast.error("Error in handelDelete catch")

    }
  }



  return (
    <>
      <Layout title={"Dashboard- CreateCategory"}>
        <div className="container-fluid p-3 m-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Manage Category</h1>
              <div className="p-3 w-50">
                <InputForm value={name} handelSubmit={handelSubmit} setValue={setName} />
              </div>
              <div className="table-content w-75">

                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      categories?.map((c) => (
                        <>
                          <tr>
                            <td key={c._id}>{c.name}</td>
                            <td><button className='btn btn-primary w-50'
                              onClick={() => {
                                setVisible(true);
                                setUpdated(c.name);
                                setSelected(c);
                              }}
                            >
                              Edit </button></td>
                            <td><button className='btn btn-danger w-50'
                              onClick={() => {
                                setSelected(c);
                                handelDelete(c._id);
                              }
                              }

                            >
                              Delete </button></td>
                          </tr >
                        </>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
            <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
              <InputForm value={updated} setValue={setUpdated} handelSubmit={handelUpdateSubmit} />
            </Modal>

          </div>
        </div>
      </Layout >
    </>
  )
}



export default CreateCategory