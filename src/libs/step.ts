
import { stage } from "@/types/step.type";
import axios from "./axios";
// export async function getAllStages(){
//   try {
//     const query = await fetch("http://localhost:3001/api/stage");
//     // console.log(query.data);
    
//     // if ("error" in query.data) throw new Error(query.data.error);
//     const data: stage[] =await  query.json()
    
//     return data
//   } catch (error) {
//     // Handle error here
//     console.log(error);
//   }
// }

export const getAllStages=async()=>{
    const get=await fetch('http://localhost:3001/api/stage',{next:{revalidate:10}});
    const data: stage[] =await  get.json()
    return data
}

