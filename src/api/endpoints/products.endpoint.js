import api from "../axios";

export default class Products {
  static async getProducts(query) {
    try {
      let base = "/api/products";
      if (query) {
        base += query;
      }
      const { data } = await api.get(base);
      return data;
    } catch (error) {
      const message = error.response.data.errors[0].message;
      throw new Error(message);
    }
  }


  static async productById(id) {
    try {
      const { data } = await api.get(`/api/products/${id}?depth=1`);
      return data;
    } catch (error) {
      const message = error.response.data.errors[0].message;
      throw new Error(message);
    }
  }

  static async getAllCategories() {
    try {
      const { data } = await api.get("/api/categories");
      return data;
    } catch (error) {
      const message = error.response.data.errors[0].message;
      throw new Error(message);
    }
  }
}
