import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  CButton,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CCard,
  CCardBody,
  CCardHeader,
  CAlert,
} from '@coreui/react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addCat } from '../userSlice'
import Swal from 'sweetalert2'

const Category = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const dispatch=useDispatch()
  

  // async function form(data) {
  //   const res = await axios.post('http://localhost:5000/Category', data)
  //   if(res){
  //     alert("Category Added Successfully!")
  //   }
  //   console.log(data)
  //   reset()
    
  // }
  function form(data) {
    dispatch(addCat({...data}))
    
    reset()
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Your Category has been saved",
      showConfirmButton: false,
      timer: 1500
    });
    
  }

  return (
    <div className="container mt-5">
      <CCard>
        <CCardHeader>
          <h2>Add New Category</h2>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit(form)}>
            {/* Category Name */}
            <div className="mb-3">
              <CFormLabel htmlFor="categoryName">Category Name</CFormLabel>
              <CFormInput
                id="categoryName"
                type="text"
                {...register('categoryName', { required: 'Category name is required' })}
                placeholder="Enter category name"
                className={`form-control ${errors.categoryName ? 'is-invalid' : ''}`}
              />
              {errors.categoryName && <CAlert color="danger">{errors.categoryName.message}</CAlert>}
            </div>
           

            {/* Category Description */}
            {/* <div className="mb-3">
              <CFormLabel htmlFor="categoryDescription">Category Description</CFormLabel>
              <CFormTextarea
                id="categoryDescription"
                {...register('categoryDescription', { required: 'Category description is required' })}
                placeholder="Enter category description"
                className={`form-control ${errors.categoryDescription ? 'is-invalid' : ''}`}
              />
              {errors.categoryDescription && (
                <CAlert color="danger">{errors.categoryDescription.message}</CAlert>
              )}
            </div> */}

            <CButton type="submit" color="primary">
              Add Category
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </div>




  )
}

export default Category
