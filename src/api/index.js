import axios from 'axios'

const API = axios.create({ baseURL: 'https://topupgamesku.herokuapp.com/' })

export const fetchAllSlides = () => API.get(`/api/slide`)
export const fetchAllCategories = () => API.get(`/api/category`)
export const fetchCategory = (name) => API.get(`/api/category/${name}`)
export const fetchProducts = (name) => API.get(`/api/etalase/${name}`)
export const fetchProduct = (id) => API.get(`/api/etalase/product/${id}`)
export const createOrder = (order) => API.post(`/api/etalase/order`, order)
export const fetchOrder = (id) => API.get(`/api/etalase/order/${id}`)
