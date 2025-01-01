import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'

var API_URL = 'http://localhost:5000/Category'
export const addCat = createAsyncThunk('user/addCat', async (data) => {
  const res = await axios.post(API_URL, data)
  console.log(res.data)
  return res.data
})

export const viewCat = createAsyncThunk('users/viewCat', async () => {
  const res = await axios.get(API_URL)
  return res.data
})
export const delCat = createAsyncThunk('users/delCat', async (id) => {
 await axios.delete(`${API_URL}/${id}`)
  return id
})

export const updateCat = createAsyncThunk('users/updateCat', async (data) => {
  const { id } = data
  await axios.put(`${API_URL}/${id}`, data)
})

const initialState = {
  userList: [],
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCat.fulfilled, (state, action) => {
        state.userList.push(action.payload)
        console.log(action.payload)
      })
      .addCase(viewCat.fulfilled, (state, action) => {
        state.userList = action.payload
      })
      .addCase(delCat.fulfilled, (state, action) => {
        const id = action.payload
        const filterData = state.userList.filter((user) => {
          return user.id !== id
        })
        state.userList = filterData
      })
      .addCase(updateCat.fulfilled, (state, action) => {
        const id = action.payload

        const index_num = state.userList.findIndex((user) => {
          return user.id == id
        })
        if (index_num !== -1) {
          state.userList[index_num] = action.payload
        }
      })
  },
})
export default userSlice.reducer
