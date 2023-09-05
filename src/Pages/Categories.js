import React from 'react'
import Layout from './../Components/Layout/Layout';
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={'All categories'}>
      <div className="container m-3">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-6 g-2">

              <Link to={`/category/${c.slug}`} className='btn btn-primary btn-lg'>{c.name}</Link>

            </div>

          ))}


        </div>
      </div>

    </Layout>
  )
}

export default Categories