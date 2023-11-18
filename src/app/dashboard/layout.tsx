'use client';
import AsideNav1 from '@/components/DashBoard/AsideNav1';
import DashBoardHeader from '@/components/DashBoard/DashBoardHeader';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { heigthNavDashboard } from '@/store/uiSlice';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Función para actualizar la altura del nav
    const updateNavHeight = () => {
      const navElement = document.getElementById('navDashboard'); // Ajusta el id según tu estructura
      if (navElement) {
        dispatch(heigthNavDashboard(navElement.offsetHeight));
      }
    };

    // Actualiza la altura del nav al cargar la página y cuando cambia el tamaño de la ventana
    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);

    // Limpieza del evento al desmontar el componente
    return () => {
      window.removeEventListener('resize', updateNavHeight);
    };
  }, []); // El segundo parámetro vacío asegura que se ejecute solo una vez al montar el componente

  return (
    <div className='min-h-screen flex  '>
      <aside className='flex bg-blue text-white flex-col w-[20%] pt-6 gap-6 items-center text-center relative z-50'>
        <AsideNav1 />
      </aside>
      <section className='w-full overflow-auto flex flex-col items-center'>
        <header className=' flex justify-end w-full' id='navDashboard'>
          <DashBoardHeader name='Kathy' image={''} notifications={'5'} />
        </header>
        <main className=' bg-slate-300 w-full flex flex-col  h-full p-4 gap-4 items-center'>
          {children}
        </main>
      </section>
    </div>
  );
}
