import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("accesscookie");
  console.log('existe el token?',req.cookies.has('accesscookie'))
  if (!token) {
    console.log('no existe kpo anda pa ya');
    const resquestedPage = req.nextUrl.pathname; //ruta solicitada
    const url = req.nextUrl.clone(); //clonamos la url(localhost o deploy)
    url.pathname = "/"; ///seteamos la url a donde redirigiremos
    return NextResponse.redirect(url); //redirigimos a url base
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/mis-cursos"],
};
