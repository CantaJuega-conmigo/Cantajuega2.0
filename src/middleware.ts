import { getToken, } from 'next-auth/jwt';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { store } from './store/store';

export async  function middleware(req: NextRequest) {
   const seeStore=store.getState().userReducer.user
   console.log(seeStore)
  const session= await getToken({req,secret:'GeImtjtgD0GE7Wi/Y3q1TUyRXK1ki99ispVmtuf8ZeE='})

  if(!session){
    // const resquestedPage=req.nextUrl.pathname;//ruta solicitada
    // const url=req.nextUrl.clone();//clonamos la url(localhost o deploy)
    // url.pathname='/';///seteamos la url a donde redirigiremos
    // return NextResponse.redirect(url)//redirigimos a url base
    console.log('ruta a proteger')
  }
  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/mis-cursos'],
  
}