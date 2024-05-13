import { client } from "../client";

export const AuthService = {
  signIn: (body: { email: string; password: string }) => {
    return client.post("/auth/signin", body);
  },

  signUp: (body: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
  }) => {
    return client.post("/auth/signup", body);
  },
};
