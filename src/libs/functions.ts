import axios from './axios';
import { setUser } from '@/store/userSlice';
import { store } from '@/store/store';
import Cookies from 'js-cookie';
import { loginResponse, loginbody, registerBody, responses } from '@/types';

export async function registerUser(body: registerBody): Promise<void> {
  try {
    const query: responses<loginResponse> = (
      await axios.post('/user/register', body)
    ).data;
    const { user } = query.data![0];
    store.dispatch(setUser(user));
    alert(`Felicidades, te registraste con exito ${user.firstName}`);
    return;
  } catch (error) {
    console.log(error);
  }
}

export async function loginUser(body: loginbody): Promise<void> {
  const isAnySession = Cookies.get('accesscookie');
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/cookie`, { credentials: 'include' })
    .then((res) => console.log(res))
    .then((err) => console.log(err));
  if (!isAnySession) {
    try {
      const petition: responses<loginResponse> = (
        await axios.post('/user/login', body)
      ).data;
      const { user } = petition.data![0];
      console.log(user);

      store.dispatch(setUser(user));
    } catch (error: any) {
      let message;
      if (error.response.message) {
        message = error.response.message;
      } else if (typeof error.response.data.message === 'string') {
        message = error.response.data.message;
      } else if (error.response.data.message.errors[0].msg) {
        message = error.response.data.message.errors[0].msg;
      } else {
        message = 'Ocurrió un error, intente mas tarde';
      }
      throw new Error(message);
    }
  } else {
    throw new Error('Ya hay una sesion activa');
  }
}

export async function logoutUser() {
  try {
    const resquest = await axios.get('/user/logout');
    store.dispatch(setUser(null));
    alert(resquest.data);
  } catch (error) {
    console.log(error);
  }
}
