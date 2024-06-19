import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalcService {
  private baseUrl = 'http://localhost:3000/calc';

  constructor() {}

  private async performOperation(endpoint: string, num1: number, num2: number): Promise<{ result: number }> {
    const data = { a: num1, b: num2 };
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    return fetch(`${this.baseUrl}/${endpoint}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na requisição: ' + response.statusText);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Erro ao realizar a operação:', error);
        throw error;
      });
  }

  add(num1: number, num2: number): Promise<{ result: number }> {
    return this.performOperation('add', num1, num2);
  }

  subtract(num1: number, num2: number): Promise<{ result: number }> {
    return this.performOperation('subtract', num1, num2);
  }

  divide(num1: number, num2: number): Promise<{ result: number }> {
    return this.performOperation('divide', num1, num2);
  }

  multiply(num1: number, num2: number): Promise<{ result: number }> {
    return this.performOperation('multiply', num1, num2);
  }
}