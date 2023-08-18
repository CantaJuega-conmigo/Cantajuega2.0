import { UserQueryResponse, loginBody } from "@/types";
import axios from "./axios";
import { setUser } from "@/store/userSlice";
import { store } from "@/store/store";
import Cookies from "js-cookie";
import {redirect} from 'next/navigation'
// Crear la cookie con el token y la duración correspondiente

export const getUsers = async () => {
  const get = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-cache",
  });
  const data = await get.json();
  return data;
}; ///pruebas

export async function loginUser(body: loginBody): Promise<void> {
  const isAnySession = Cookies.get("accessToken");
  if (!isAnySession) {
    try {
      const petition: UserQueryResponse = await axios.post("/user/login", body);
      if ("error" in petition.data) throw new Error(petition.data.error);
      localStorage.setItem("tkn", petition?.data.token);
      Cookies.set("accessToken", petition?.data.token, {
        expires: 86400,
      });
      store.dispatch(setUser(petition?.data.user));
      alert(`bienvenido ${petition.data.user.firstName}`);
      return;
    } catch (error) {
      console.log(error);
      throw new Error("algo salio mal :(");
    }
  }else{
    throw new Error('Ya hay una sesion activa')
  }
}

export async function logoutUser(){  
  localStorage.removeItem('tkn');
  Cookies.remove('accessToken')
  store.dispatch(setUser(null));

}