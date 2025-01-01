import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateCat, viewCat } from '../userSlice'
import { CAlert, CButton, CCard, CCardBody, CCardHeader, CForm, CFormInput, CFormLabel } from '@coreui/react'
import Swal from 'sweetalert2'

const UpdateCat = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const redirect=useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const { userList } = useSelector((state) => state.users);
  const singleUser = userList.find((user) => {
    return user.id === id;
  });

  function update(data) {
    dispatch(updateCat(data))
     Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Category Updated!",
            showConfirmButton: false,
            timer: 1500
          });
    redirect("/CATEGORY/View Category")
    
  }
  useEffect(()=>{
    dispatch(viewCat())
    reset(singleUser)
  },[dispatch])

  return (
    <>
      <div className="container mt-5">
        <CCard>
          <CCardHeader>
            <h2>Add New Category</h2>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit(update)}>
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
                {errors.categoryName && (
                  <CAlert color="danger">{errors.categoryName.message}</CAlert>
                )}
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

              <CButton type="submit" color="warning">
                Update Category
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </div>
    </>
  )
}

export default UpdateCat
