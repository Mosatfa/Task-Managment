import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('TS-UR')

  const modifiedRequest = req.clone({
    setHeaders: {
      Authorization: `Route__${token}`
    }
  })
  return next(modifiedRequest);
};
