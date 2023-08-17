import { BsArrowLeftShort } from 'react-icons/bs'
import styles from '../../styles/NewsletterSuscription.module.css'
import Image from 'next/image'
import image from '../../../public/img/img.png'
import Link from 'next/link'
export default function NewsletterSuscription(){
  
    return(
    <div id='contacto' className={`${styles.Container}  h-[40rem] justify-evenly sm:h-[39rem] bg-secondOrange flex flex-col items-center  sm:justify-center pb-7 relative`}>
      <Image src={image} alt='cjimgs' className=' absolute top-0 h-[43%] sm:top-[20%] left-0 sm:h-[70%] w-auto z-0 ' />
     <div className={`${styles.Aux} h-[2rem] w-full absolute top-0`}>
     
     </div>
        <section className='h-[7rem] w-11/12 max-w-[53rem] flex items-center justify-center z-10 '>
           <h1 className=' text-lg 2xl:text-3xl xl:text-2xl lg:text-xl  text-center'>
            ¡Suscríbete para recibir semana a semana nuestro boletín especial! 
             Material educativo, cursos, libros y mucho mas
          </h1>
        </section>  

        <section className={`${styles.FormSection} z-10 flex flex-col items-center  w-11/12 max-w-[44rem] h-[20rem] pt-2  mt-3  `}>
           <section className=' h-1/6 flex items-center '>
           <h1 className=' text-xl 2xl:text-3xl xl:text-2xl lg:text-xl  text-center'>Acompaña a tu hijo en esta nueva etapa</h1>
           </section>
          <form className='flex flex-col items-center justify-evenly sm:justify-normal  w-11/12 sm:w-8/12 h-5/6  '>
            <input className=' max-[640px]:max-w-[20rem] w-11/12 sm:w-[20.5rem] h-[2.5rem] sm:h-[3.5rem] pl-4 border-b-2 mb-2 border-black border-opacity-30 rounded' type="text" name="" id="" placeholder='Nombre'/>
            <input className=' max-[640px]:max-w-[20rem] w-11/12 sm:w-[20.5rem] h-[2.5rem] sm:h-[3.5rem] pl-4 border-b-2 mb-2 border-black border-opacity-30 rounded' type="text" name="" id="" placeholder='Correo electronico' />
            <input className=' max-[640px]:max-w-[20rem] w-11/12 sm:w-[20.5rem] h-[2.5rem] sm:h-[3.5rem] pl-4 border-b-2 mb-2 border-black border-opacity-30 rounded' type="number" name="" id="" placeholder='Telefono'/>
            <button type='submit' className=' bg-white  border-orangeicons w-[8rem] mt-2'>Enviar</button>
          </form>
        </section>
        <div className='absolute  w-full h-[10%] bottom-0'>
       <Link href={'/'}>
       
        <button className=' z-10 absolute left-[24%]

         min-[300px]:left-[28%]
        min-[400px]:left-[35%]
        min-[500px]:left-[38%] sm:left-[39%] md:left-[40%] lg:left-[43.5%] 
        xl:left-[44.5%] 2xl:left-[45.5%]   bg-blue sm:h-[3.5rem] sm:w-[10rem] 
        rounded-full text-white h-[2.5rem] w-[9rem] max-sm:top-[20%]'>
          Inicio
          <BsArrowLeftShort className='text-[1.7rem] max-sm:top-[18%] max-sm:left-[15%] absolute top-[30%] left-[20%] text-orangeicons'/>
        </button>
       </Link>

        </div>
    </div>
  )
}