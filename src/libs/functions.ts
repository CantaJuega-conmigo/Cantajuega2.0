import axios from "./axios";
import { setUser } from "@/store/userSlice";
import { store } from "@/store/store";
import Cookies from "js-cookie";
import { loginResponse, loginbody, registerBody, responses } from "@/types";
import { log } from "console";
import { registerChild } from "@/types/Register";

export async function acountConfirmation(
  email: string,
  code: string
): Promise<boolean> {
  try {
    await axios.get(`/user/verify?email=${email}&code=${code}`);
    return true;
  } catch (error: any) {
    return false;
  }
}

export async function registerUser({
  child,
  user,
}: registerBody): Promise<true | any> {
  const isAnySession = Cookies.get("accesscookie");
  if (!isAnySession) {
    try {
      const body = {
        child,
        user,
      };
      const query: responses<loginResponse> = (
        await axios.post("/user/register", body)
      ).data;
      const { user: UserData } = query.data![0];
      store.dispatch(setUser(UserData));
      return true;
    } catch (error: any) {
      console.log(error);
      if (error.response.data.message.errors) {
        throw new Error(error.response.data.message.errors[0]?.msg);
      } else if (typeof error.response.data.message === "string") {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("No se ha podido crear el usuario");
      }
    }
  } else {
    throw new Error("Ya hay una sesion activa");
  }
}

export async function loginUser(body: loginbody): Promise<void> {
  const isAnySession = Cookies.get("accesscookie");
  if (!isAnySession) {
    try {
      const petition: responses<loginResponse> = (
        await axios.post("/user/login", body)
      ).data;
      const { user } = petition.data![0];
      console.log(user);

      store.dispatch(setUser(user));
    } catch (error: any) {
      let message;
      if (error.response.message) {
        message = error.response.message;
      } else if (typeof error.response.data.message === "string") {
        message = error.response.data.message;
      } else if (error.response.data.message.errors[0].msg) {
        message = error.response.data.message.errors[0].msg;
      } else {
        message = "Ocurrió un error, intente mas tarde";
      }
      throw new Error(message);
    }
  } else {
    throw new Error("Ya hay una sesion activa");
  }
}
export async function googleLogin(): Promise<void> {
  const isAnySession = Cookies.get("accesscookie");
  if (!isAnySession) {
    try {
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
    } catch (error) {
      console.log(error);
    }
  } else {
    throw new Error("Ya hay una sesion activa");
  }
}

export async function logoutUser() {
  try {
    const resquest = await axios.post("/user/logout");
    store.dispatch(setUser(null));
    alert(resquest.data?.message);
  } catch (error) {
    console.log(error);
  }
}
export async function CompleteChildRegister(child: registerChild) {
  try {
    const resquest = await axios.post("/child/create", { child: child });
    alert("Has completado el registro con google correctamente");
  } catch (error) {
    console.log(error);
  }
}
