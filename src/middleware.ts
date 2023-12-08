import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('accesscookie');

  try {
    if (!token) {
      const url = req.nextUrl.clone(); //clonamos la url(localhost o deploy)

      url.pathname = '/'; ///seteamos la url a donde redirigiremos
      return NextResponse.redirect(url); //redirigimos a url base
    }

    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      const { payload } = await jwtVerify(
        token.value,
        new TextEncoder().encode('SECRETO')
      );
      if (!payload?.user?.is_Admin) {
        const url = req.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.error();
        //Si la ruta visitada es dashboard y no es admin tiro un error el cual lo redirige a la pagina de notfound
      }
      return NextResponse.next();
    }

    return NextResponse.next();
  } catch (error) {
    console.log({ errorCookie: error });
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/mis-cursos', '/dashboard/:path*'],
};
