import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("accesscookie");
// try {
//     if (!token) {
//       const resquestedPage = req.nextUrl.pathname; //ruta solicitada
//       const url = req.nextUrl.clone(); //clonamos la url(localhost o deploy)
//       url.pathname = "/"; ///seteamos la url a donde redirigiremos
//       return NextResponse.redirect(url); //redirigimos a url base
//     }
//     return NextResponse.next();
  
// } catch (error) {
//   console.log(error)
// }
console.log('token',token);

return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/mis-cursos"],
};
