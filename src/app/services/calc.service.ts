import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalcService {
  private baseUrl = 'http://localhost:3000/calc';

  constructor(private http: HttpClient) {}

  private performOperation(endpoint: string, num1: number, num2: number): Observable<{ result: number }> {
    const data = { a: num1, b: num2 };
    return this.http.post<{ result: number }>(`${this.baseUrl}/${endpoint}`, data)
      .pipe(
        catchError(error => {
          console.error('Erro ao realizar a operação:', error);
          return throwError(error);
        })
      );
  }

  add(num1: number, num2: number): Observable<{ result: number }> {
    return this.performOperation('add', num1, num2);
  }

  subtract(num1: number, num2: number): Observable<{ result: number }> {
    return this.performOperation('subtract', num1, num2);
  }

  divide(num1: number, num2: number): Observable<{ result: number }> {
    return this.performOperation('divide', num1, num2);
  }

  multiply(num1: number, num2: number): Observable<{ result: number }> {
    return this.performOperation('multiply', num1, num2);
  }
}