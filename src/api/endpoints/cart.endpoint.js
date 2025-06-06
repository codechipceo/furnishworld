import api from "../axios";

export default class Cart {
  static async addToCart(payload) {
    try {
      let base = "/api/cart";

      const { data } = await api.post(base, payload);
      return data;
    } catch (error) {
      const message = error.response.data.errors[0].message;
      throw new Error(message);
    }
  }
  static async getCart() {
    try {
      let base = "/api/cart";

      const { data } = await api.get(base);
      return data;
    } catch (error) {
      const message = error.response.data.errors[0].message;
      throw new Error(message);
    }
  }

  static async removeFromCart(id) {
    try {
      const { data } = await api.delete("/api/cart/" + id);
      return data;
    } catch (error) {
      const message = error.response.data.errors[0].message;
      throw new Error(message);
    }
  }
}
