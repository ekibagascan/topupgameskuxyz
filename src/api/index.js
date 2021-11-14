import axios from "axios";

const API = axios.create({ baseURL: "https://topupgamesku.herokuapp.com" });

export const fetchAllSlides = () => API.get(`/api/slides`);

export const fetchAllCategories = () => API.get(`/api/categories`);
export const fetchCategory = (name) =>
  API.get(`/api/categories/category/${name}`);

export const fetchProducts = (name) => API.get(`/api/products/${name}`);
export const fetchProduct = (id) => API.get(`/api/products/product/${id}`);

export const fetchOrder = (id) => API.get(`/api/orders/order/${id}`);

export const ewalletsCharge = (chargeData) =>
  API.post("/api/transactions/ewallets/charges", chargeData);
export const fetchEwalletPayData = (id) =>
  API.get(`/api/transactions/ewallets/payment/${id}`);

export const qrisCharge = (chargeData) =>
  API.post("/api/transactions/qris/charges", chargeData);
export const fetchQrisPayData = (id) =>
  API.get(`/api/transactions/qris/payment/${id}`);

export const fetchCallback = (id) =>
  API.get(`/api/transactions/callback/status/${id}`);
