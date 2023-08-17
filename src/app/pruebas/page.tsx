"use client";
import {
  useGetStageQuery,
  useRegisterUserMutation,
} from "@/store/apis/CantajuegaApi";
// import Loading from "../loading";
import { useState, FormEvent, MouseEvent } from "react";
import { RegisterBody } from "@/types";
// import { signIn, useSession } from "next-auth/react";

export default function page() {
  const [register, { data }] = useRegisterUserMutation();
  // const {data:session,status}=useSession()
  const [newUser, setNewUser] = useState<RegisterBody>({
    lastName: "",
    firstName: "",
    password: "",
    email: "",
  });
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
    register(newUser)
      .unwrap()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="min-h-screen bg-blue flex justify-center items-center">
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
{/* 
      <h1>Ya te logueaste mi rey</h1> */}
    </div>
  );
}
