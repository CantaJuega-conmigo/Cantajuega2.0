"use client"
import { useGetAllUsersQuery } from '@/store/apis/CantajuegaApi';
import DashBoardGrid from '../../../components/DashBoard/DashBoardGrid'
export default function Page() {
  const {data:users}=useGetAllUsersQuery(null)
  return (
    <>
    <h1>
      Usuarios de la app,se veria una lista de todos los usuarios, con opciones
      de paginado, al hacer click a un usuarios redirige a otra pestaña con info
      del usuario
    </h1>
    <DashBoardGrid 
     numberOfColumns={6}
     linksRedirectTo='usuarios'
     column1={{
      title:'Nombre',
      data:users?.data!,
      dataProperty:'firstName' as keyof object
     }}
     column2={{
      title:'Apellido',
      data:users?.data!,
      dataProperty:'lastName' as keyof object
     }}
     column3={{
      title:'Correo',
      data:users?.data!,
      dataProperty:'email' as keyof object
     }}
     column4={{
      title:'Verificado',
      data:users?.data!,
      dataProperty:'email_verified' as keyof object
     }}
    />
    </>
  );
}
