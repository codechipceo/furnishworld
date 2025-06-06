import api from "../axios";

class Auth {
  static login = "/api/customers/login";
  static register = "/api/customers";
  static logout = "/api/auth/logout";
  static refresh = "/api/auth/refresh";

  static async loginCustomer(loginPayload) {
    try {
      const { data } = await api.post(Auth.login, loginPayload);
      return { user: data.user, token: data.token };
    } catch (error) {
      const message = error.response.data.errors[0].message;
      throw new Error(message);
    }
  }

  static async signUp(payload) {
    try {
      const { status } = await api.post(Auth.register, payload);
      return status;
    } catch (error) {
      const message = error.response.data.errors[0].message;

      throw new Error(message);
    }
  }
}

export default Auth;
