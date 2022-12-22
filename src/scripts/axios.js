const token = localStorage.getItem("@kenzieEmpresas:token");
const tokenAdmin = localStorage.getItem("@kenzieEmpresas:tokenAdmin");

export const instance = axios.create({
  baseURL: `http://localhost:6278/`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const instanceNoToken = axios.create({
  baseURL: `http://localhost:6278/`,
  headers: {
    "Content-Type": "application/json",
  },
});
