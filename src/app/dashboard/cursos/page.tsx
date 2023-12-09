'use client';
import { useGetStageQuery } from '@/store/apis/CantajuegaApi';
import Link from 'next/link';
import { MouseEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const {
    data: stages,
    isLoading,
    isError,
  } = useGetStageQuery({ childs: true });

  if (isLoading) {
    return (
      <>
        <div className=' min-h-[20rem] flex justify-center items-center'>
          <h1 className='text-2xl'>soy un loader xd.....</h1>
        </div>
      </>
    );
  }
  if (isError) {
    return (
      <>
        <div className=' min-h-[20rem] flex justify-center items-center'>
          <h1 className='text-2xl'> Algo salio mal mi rey.....</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <h1>Cursoos</h1>
      <table className='text-center w-11/12 border border-black'>
        <thead className='bg-blue text-white border-b border-black'>
          <tr>
            <th className='p-2'>Nombre</th>
            <th className='p-2'>Descripción</th>
            <th className='p-2'>Edad Minima</th>
            <th className='p-2'>Edad Maxima</th>
            <th className='p-2'>Total alumnos</th>
            <th className='p-2'></th>
          </tr>
        </thead>

        <tbody>
          {stages?.data?.map((stage, key: number) => (
            <tr key={key}>
              <td className='border border-blue p-2'>{stage.name}</td>
              <td className='border border-blue p-2'>{stage.description}</td>
              <td className='border border-blue p-2'>{stage.minAge}</td>
              <td className='border border-blue p-2'>{stage.maxAge}</td>
              <td className='border border-blue p-2'>
                {stage.Children?.length}
              </td>
              <td className='border border-blue p-2'>
                <Link href={`/dashboard/cursos/${stage.id}`}>
                  <button className='bg-blue text-white p-1 text-sm rounded-xl'>
                    Ver mas
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <section className='w-full flex justify-center'>
        <button
          className='bg-blue text-white p-2'
          onClick={() => router.push('/dashboard/cursos/nuevaEtapa')}
        >
          Crear una nueva etapa.
        </button>
      </section>
    </>
  );
}
