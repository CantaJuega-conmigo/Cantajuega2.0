import styles from '../../../styles/Metodologias.module.css'
import image from '../../../../public/img/Untitled_Artwork-3-1.png'
import Image from 'next/image'
import { useState ,MouseEvent} from 'react'
import Modal from './Modal'
import { ModalContent,Types,Neuroeducacion,Music_art,VideoModelling } from './Interfaces'

export default function Metodologias(){
  const [modal,setModal]=useState<boolean>(false)
  const [actualModal,setActualModal]=useState<ModalContent>({
    text:'',
    title:''
  })
  const closemodal=()=>{
    setModal(false)
  }
  
  const setContentModal=(e:MouseEvent<HTMLButtonElement>):void=>{
     const value:string=e.currentTarget.value
     let content:ModalContent ={text:'',title:''};
     value===Neuroeducacion.title?content=Types.Neuroeducacion:
     value===Music_art.title?content=Types.Music_art:
     value===VideoModelling.title?content=Types.VideoModelling:null
    setActualModal(content)
    setModal(true)
  }
   return (
    <div className={`${styles.Container} mt-3 h-[15rem] md:h-[20rem] min-[940px]:h-[25rem] `} id='metodologia'>
      <section className='flex flex-col items-center justify-center h-full   relative'>
        <article className='z-20 h-1/6 '>
        <h1 className='  text-2xl sm:text-3xl md:text-4xl 2xl:text-7xl xl:text-6xl lg:text-5xl text-yellow'>Metodología</h1>
        </article>

        <article className='z-20 flex h-5/6 flex-col items-center justify-around  w-full  text-lg  2xl:text-5xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl'>   
          <button className='h-[3rem] w-[55%]  min-[400px]:w-[50%]  min-[500px]:w-[30%] max-w-[25rem]  flex items-center justify-center sm:justify-between' onClick={setContentModal} value={Neuroeducacion.title}>
            <span className='bg-blue w-[1.5rem] sm:w-[2rem] md:w-[3.2rem] md:h-full flex items-center justify-center rounded-lg text-xl
              sm:text-2xl md:text-3xl lg:text-4xl'>1</span>
            <span className=' w-[80%]  h-full items-center flex text-blue justify-center
            '>
              Neuroeducación</span>
          </button>
          <button className='h-[3rem] w-[55%]  min-[400px]:w-[50%]  min-[500px]:w-[30%] max-w-[25rem]  flex items-center justify-center sm:justify-between' onClick={setContentModal} value={Music_art.title}>
            <span className='bg-blue w-[1.5rem] sm:w-[2rem] md:w-[3.2rem] md:h-full flex items-center justify-center rounded-lg text-xl
              sm:text-2xl md:text-3xl lg:text-4xl'>2</span>
            <span className=' w-[80%]  h-full items-center flex text-blue justify-center
            '>
              Música y arte</span>
          </button>
          <button className='h-[3rem] w-[55%]  min-[400px]:w-[50%]  min-[500px]:w-[30%] max-w-[25rem]  flex items-center justify-center sm:justify-between' onClick={setContentModal} value={VideoModelling.title}>
            <span className='bg-blue w-[1.5rem] sm:w-[2rem] md:w-[3.2rem] md:h-full flex items-center justify-center rounded-lg text-xl
              sm:text-2xl md:text-3xl lg:text-4xl'>3</span>
            <span className=' w-[80%]  h-full items-center flex text-blue justify-center
            '>
              Video modeling</span>
          </button>
        </article>
      <Image alt='cjimgs' src={image} className=' z-10 absolute sm:top-[1%] md:top-[12%] min-[940px]:top-0 w-[30%] min-[500px]:min-w-[12rem]  min-[940px]:w-[39%] h-auto  lg:h-full lg:w-auto left-[0%] 2xl:left-[10%]'/>
      </section>
      {modal&&<Modal closeModal={closemodal} text={actualModal.text} title={actualModal.title}/>}
    </div>
   )
}