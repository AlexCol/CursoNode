import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API;

export default axios.create({
  baseURL,
  withCredentials: true
});
