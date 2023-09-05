import React from 'react'
import { useSearch } from '../../Contex/Search'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();


  const handelSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/api/v1/product/search/${values.keyword}`);
      setValues({ ...values, results: data });
      navigate('/search');



    } catch (error) {
      console.log("Error in handelSubmit of search catch", error);


    }
  }
  return (
    <div>
      <form className="d-flex" role='search' onSubmit={handelSearchSubmit}>
        <input
          className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
          value={values.keyword}
          onChange=
          {(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type='submit'>Search</button>
      </form>
    </div>

  )
}

export default SearchInput