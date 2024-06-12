import axios from "axios";

export const client = axios.create({
  baseURL: "http://localhost:3000/",
});

client.interceptors.response.use((res) => {
  if (res.status >= 400 && res.status <= 500) {
    throw Error("Erro na requisição");
  }
  return res;
});
