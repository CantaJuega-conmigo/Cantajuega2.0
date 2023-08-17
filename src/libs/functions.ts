import { useSession,signOut } from "next-auth/react";

export const getUsers = async () => {
  const get = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-cache",
  });
  const data = await get.json();
  return data;
}; ///pruebas

export async function authUser(): Promise<void> {
     const {data}=useSession()
     console.log(data)
  try {
    const token = "tu-token-aqui";
    const query = await fetch("http://localhost:3001/api/user/auth", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(!query.ok){
     // signOut({redirect:false})
     console.log('me deslogueo');
     
    }
    return;
  } catch (error) {
    
    console.log(error);
  }
}
