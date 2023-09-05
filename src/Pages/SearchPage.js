import React from 'react'
import Layout from './../Components/Layout/Layout';
import { useSearch } from '../Contex/Search';

const SearchPage = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={'Search Results'}>
      <div className="container">
        <div className="text-center">
          <h1>Search Result</h1>
          <h6>{values?.results.length < 1 ? "No Product Found" : `Found ${values?.results.length}`}</h6>

          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2 shadow" style={{ width: '18rem' }}>
                <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top h-100" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <p className="card-text">${p.price}</p>

                  <button className='btn btn-primary ms-1'>
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

export default SearchPage