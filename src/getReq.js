import axios from 'axios'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const getReq = async (setIsLoading, url, data={}, headers={}) => {
  // return new Promise((resolve, reject) => {

  // })
  setIsLoading(true)
  let responseData = {}
   await axios.get(process.env.REACT_APP_API_URL+url, data, {
      headers: headers
    })
  .then(response => {responseData = response.data})
  .catch(error => {throw error})
  .finally(() => setIsLoading(false))
  return responseData
}

export const putReq = async (setIsLoading, url, data={}) => {
  setIsLoading(true)
  let responseData = {}
   await axios.put(process.env.REACT_APP_API_URL+url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }
    })
  .then(response => {responseData = response.data})
  .catch(error => {throw error})
  .finally(() => setIsLoading(false))
  return responseData
}

export const postReq = async (setIsLoading, url, data={}) => {
  setIsLoading(true)
  let responseData = {}
   await axios.post(process.env.REACT_APP_API_URL+url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }
    })
  .then(response => {responseData = response.data})
  .catch(error => {console.log(error); throw error})
  .finally(() => setIsLoading(false))
  return responseData
}

export const displayError = (error) => {
  if (error.response && error.response.data && error.response.data.error) {
    toast.error(error.response.data.error);
  }
};
