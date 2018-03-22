import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest, HttpParams} from '@angular/common/http';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient
  ) {}

  private formatErrors(errorResponse: any) {
    return new ErrorObservable(errorResponse.error);
  }

  upload(payload: any): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();
    formData.append('file', payload);

    const req = new HttpRequest('POST', environment.api_url + '/files/upload', formData, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`
    ).pipe(catchError(this.formatErrors));
  }
}
