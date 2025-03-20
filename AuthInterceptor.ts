import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  // Clone la requête et ajoute des en-têtes si nécessaire
  const authReq = req.clone({
    headers: req.headers.set('Content-Type', 'application/json')
  });

  // Passe la requête modifiée au prochain intercepteur ou au gestionnaire HTTP
  return next(authReq);
};