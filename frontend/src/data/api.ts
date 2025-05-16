import axios from 'axios';

// Set up the base URL for the API
const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

// Axios instance for making requests
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Fetch data for vendors, materials, purchase orders, etc.
export const fetchVendors = async () => {
  try {
    const response = await api.get('/vendors/');
    return response.data;
  } catch (error) {
    console.error("Error fetching vendors:", error);
  }
};

export const fetchMaterials = async () => {
  try {
    const response = await api.get('/materials/');
    return response.data;
  } catch (error) {
    console.error("Error fetching materials:", error);
  }
};

export const fetchPurchaseOrders = async () => {
  try {
    const response = await api.get('/purchase-orders/');
    return response.data;
  } catch (error) {
    console.error("Error fetching purchase orders:", error);
  }
};

export const fetchInwards = async () => {
  try {
    const response = await api.get('/inwards/');
    return response.data;
  } catch (error) {
    console.error("Error fetching inwards:", error);
  }
};

export const fetchOutwards = async () => {
  try {
    const response = await api.get('/outwards/');
    return response.data;
  } catch (error) {
    console.error("Error fetching outwards:", error);
  }
};

// You can create other functions to fetch other data you need
