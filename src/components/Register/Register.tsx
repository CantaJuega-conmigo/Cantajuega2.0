
import { AUTH_MODAL_TYPE } from '../../utils/constants';
// import styles from '../../styles/register.module.css'
import { useEffect, useState } from 'react'
import { registerError } from '../../utils/FormsErrors';
import { IoMdClose,IoMdEye,IoMdEyeOff} from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import { registerUser } from '@/libs/functions';


interface RegisterProps {
   handleOpen: (name: AUTH_MODAL_TYPE) => void;
 }
 interface InputProps {
  email: string;
  password: string;
  lastName: string,
  firstName: string,
}
interface ErrorProps {
  email?: string;
  password?: string;
  global?: string;
  lastName?: string,
  firstName?:string,
}



 const Register: React.FC<RegisterProps> = ({ handleOpen }) => {

  const [input, setInput] = useState<InputProps>({
    email: "",
    password: "",
    lastName: "",
    firstName: "",
  });

  const [error, setError] = useState<ErrorProps>({
    global :"Todos los campos son obligatorios"
  });
  const [visibleErrors,setVisibleErrors]=useState<boolean>(false)
  const [visiblePassword,setVisiblePassword]=useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));

    console.log(input);
    
    setError(registerError({
      ...input,
      [name]: value,
    }));
    console.log(error)
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerUser(input)
    if(Object.keys(error).length){
       error.global&&alert(error.global)
       return setVisibleErrors(true),
       setTimeout(() => {
        setVisibleErrors(false)
       }, 10000);
      }
     console.log('Creado')
  };

  useEffect(()=>{
    const body= document.getElementById('Body') as HTMLBodyElement;
    const mainhome= document.getElementById('mainhome') as HTMLBodyElement;
    const nav= document.getElementById('menunav') as HTMLBodyElement;
 
    body.style.overflow='hidden';
    mainhome&&(mainhome.style.position='relative')
    mainhome&& (mainhome.style.zIndex='-1')
    nav.style.zIndex='-1'
    return()=>{
       body.style.overflow='auto'
     mainhome&&  (mainhome.style.position='static')
      mainhome&& (mainhome.style.zIndex='50')
       nav.style.zIndex='50'
      }
  },[])

  function showPassword(): void {
    const passwordInput = document.getElementById("password") as HTMLInputElement;

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
    setVisiblePassword(!visiblePassword)
  }
  
   return (
    <div className={`${styles.Container} fixed h-full w-full z-50 flex top-0 justify-center items-center overflow-auto`} >
     
            <div className= { `${styles.FormContainer}  bg-slate-300 border border-solid border-black rounded-xl overflow-hidden  flex flex-col items-center `}>
                <div className='flex justify-end w-full'>
          <button className='text-black'  onClick={() => handleOpen(AUTH_MODAL_TYPE.REGISTER)}>
            <IoMdClose
              className={`${styles.CloseButton} text-3xl  cursor-pointer hover:text-blue hover:scale-110
              ease-in-out transition-all`}
            />
          </button>
        </div>
       
              <section className='w-full p-2'>
            <h1 className=' text-2xl  text-black ml-3'>Crea un usuario: </h1>  
        </section>
       
            <form className={`${styles.Form}  flex flex-col  w-5/6 justify-evenly`} onSubmit={handleSubmit}>
        
             <label className=' text-sm' htmlFor="">NOMBRE </label>
             <input type="text" onChange={handleChange} name='firstName' /> 
             {visibleErrors&&error.firstName&&<span className='text-red-500'>{error.firstName}</span>}
             <label className=' text-sm' htmlFor="">APELLIDO</label>
             <input type="text" onChange={handleChange} name='lastName' /> 
             {visibleErrors&&error.lastName&&<span className='text-red-500'>{error.lastName}</span>}

             <label className=' text-sm' htmlFor="">CORREO ELECTRÓNICO</label>
             <input type="text" onChange={handleChange} name='email'/> 
             {visibleErrors&&error.email&&<span className='text-red-500'>{error.email}</span>}

             <label className=' text-sm' htmlFor="">CONTRASEÑA</label> 
             <section className='flex items-center relative' >
             <input type="password" className=' w-full' onChange={handleChange} name='password' id='password' />
             
             {visiblePassword?<IoMdEye className=' absolute right-0 cursor-pointer'onClick={showPassword}/>:
             <IoMdEyeOff className=' absolute right-0 cursor-pointer'onClick={showPassword}/>} 
             
             </section>
             {visibleErrors&&error.password&&<span className='text-red-500'>{error.password}</span>}

              <section className='flex justify-between'>
              <article >  
                <input type="checkbox" name="" id="recurdame"/>
                <label className=' text-sm' htmlFor="">recuerdame </label>
              </article>
              <article className={`${styles.pwforgot} flex items-center`}>
                <span className="cursor-pointer " onClick={() => {
                  handleOpen(AUTH_MODAL_TYPE.LOGIN)
                  handleOpen(AUTH_MODAL_TYPE.REGISTER)
                  }}>ya tengo cuenta
                </span>
              </article>
             </section>

             <section className={`${styles.SubmitSection} flex justify-center items-center h-1/6 max-h-12` }>
              <button type="submit" className='bg-secondOrange w-3/4 h-full rounded-md hover:bg-yellow-300'> Crear </button>
             </section>

        </form>
   

              <div className='flex justify-center items-center w-3/4'>
            <section className=" border-b border-solid w-full  border-black"></section>
            <h5>O</h5>
            <section className=" border-b border-solid w-full  border-black"></section>
         </div>

                  <section className={ `${styles.googleButtonSection} w-full flex justify-center  items-center`}>
            <button  type="button" className='border border-solid rounded-md border-black w-7/12 h-3/4 flex justify-center items-center ' >
              <FcGoogle className='text-3xl' /> 
              <span className='text-black font-bold'>
                Login with google
              </span> 
            </button>
          </section>
      </div>
    </div>
   )
}

export default Register;