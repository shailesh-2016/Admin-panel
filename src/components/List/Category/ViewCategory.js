import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { delCat, viewCat } from '../userSlice'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'

const ViewCategory = () => {
  // const [userData, setData] = useState([])

  const { userList } = useSelector((state) => state.users);
  const dispatch=useDispatch()

  // async function showApi() {
  //   const res = await axios.get('http://localhost:5000/Category')
  //   setData(res.data)
  // }
  

  // async function trash(id) {
  //   if(confirm("Do you want to Delete Catogary??")){
  //       await axios.delete(`http://localhost:5000/Category/${id}`)
  //   }
  //   showApi()
    
  // }
  function trash(id){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(delCat(id))
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

  useEffect(() => {
   dispatch(viewCat())
  }, [dispatch])
  return (
    <>
      <div className="container mt-5">
        <CCard>
          <CCardHeader>
            <h2>Category List</h2>
          </CCardHeader>
          <CCardBody>
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Category Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((category, index) => (
                  <tr key={category.id}>
                    <td>{index + 1}</td>
                    <td>{category.categoryName}</td>
                    <td>
                      <CButton className='btn btn-outline-danger ms-1' size="sm"  onClick={() => trash(category.id)}>
                      <i class="fa-solid fa-xmark"></i>

                      </CButton>
                      <NavLink to={`/update/${category.id}`} className="btn btn-outline-warning btn-sm ms-2"
                      >
                        <i class="fa-solid fa-pen-to-square"></i></NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </div>
    </>
  )
}

export default ViewCategory
