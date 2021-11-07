import axios from "axios";

const API = axios.create({ baseURL: "https://topupgamesku.herokuapp.com" });

export const fetchAllSlides = () => API.get(`/api/slides`);

export const fetchAllCategories = () => API.get(`/api/categories`);
export const fetchCategory = (name) =>
  API.get(`/api/categories/category/${name}`);

export const fetchProducts = (name) => API.get(`/api/products/${name}`);
export const fetchProduct = (id) => API.get(`/api/products/product/${id}`);

export const createOrder = (order) => API.post(`/api/orders`, order);
export const fetchOrder = (id) => API.get(`/api/orders/order/${id}`);

export const ewalletCharge = (chargeData) =>
  API.post(`/api/transactions/ewallets`, chargeData);
export const ewalletOvoCharge = (chargeData) =>
  API.post(`/api/transactions/ewallets/charges`, chargeData);
