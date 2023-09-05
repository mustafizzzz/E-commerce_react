import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function useCategory() {

  const [categories, setCategories] = useState([])

  //get categories

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/get-category`);

      if (data?.success) {
        setCategories(data.category);
      }

    } catch (error) {
      console.log("Erro in Hooks getCategories ", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, [])

  return categories;

}