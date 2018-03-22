import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {JwtService} from '../../services/jwt.service';


@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    let request;

    if (req.body instanceof FormData) {
      // todo kind of works - keep request untouched when posting files
      let tmp = req.body.get('file');
      if (tmp) {
        headersConfig['Content-Type'] = 'multipart/form-data; boundary=???';
      }

      request = req.clone();

    } else {
      const token = this.jwtService.getToken();

      if (token) {
        headersConfig['Authorization'] = `Token ${token}`;
      }

      request = req.clone({ setHeaders: headersConfig });
    }

    return next.handle(request);
  }
}
