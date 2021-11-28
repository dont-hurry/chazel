import axios from "axios";
import { baseUrl } from "../constants/api";

export async function login(username, password) {
  const response = await axios.post(`${baseUrl}/users`, { username, password });
  return response.data;
}
