"use client";
import {
  useAuthqQuery,
  useGetStageQuery,
} from "@/store/apis/CantajuegaApi";

import { useState, FormEvent, MouseEvent } from "react";
import { RegisterBody } from "@/types";
import { useAppSelector } from "@/store/hooks";
import Loading from "../loading";
export default function Page() {

  const user = useAppSelector((state) => state.userReducer.user);
  const { data, isLoading } = useAuthqQuery(null);
  const [newUser, setNewUser] = useState<RegisterBody>({
    lastName: "",
    firstName: "",
    password: "",
    email: "",
  });
  if (isLoading) {
    return <Loading />;
  }
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewUser({
      ...newUser,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  const handleRegister = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // signIn("credentials", { redirect: false, ...newUser})
    //   .then((response) => console.log(response))
    //   .catch((err) => console.log(err));
    // register(newUser)
    //   .unwrap()
    //   .then((res:any) => console.log(res))
    //   .catch((err) => console.log(err));
  };
  const seeActualUser = () => {
    console.log(user);
  };
  const seeAuthUser = () => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-blue flex justify-center items-center">
      <button onClick={seeActualUser}>Ver usuario actual</button>
      <form className="flex flex-col gap-4 p-8  border border-yellow bg-slate-500 rounded-xl">
        <label htmlFor="">FirstName</label>
        <input
          type="text"
          name="firstName"
          value={newUser.firstName}
          onChange={handleChange}
        />
        <label htmlFor="">lastName</label>
        <input
          type="text"
          name="lastName"
          value={newUser.lastName}
          onChange={handleChange}
        />
        <label htmlFor="">email</label>
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
        />
        <label htmlFor="">password</label>
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleChange}
        />
        <button onClick={handleRegister}>Registrar</button>
      </form>

      <button onClick={seeAuthUser}>auth?</button>
      {/* 
      <h1>Ya te logueaste mi rey</h1> */}
    </div>
  );
}
