import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalcService } from './services/calc.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  
  result: number | null = null;
  operation: string = 'Operação';

  constructor(private calcService: CalcService) {}

  performOperation(operator: string): void {
    const value1 = (document.querySelector('.input-top') as HTMLInputElement).value;
    const value2 = (document.querySelector('.input-middle') as HTMLInputElement).value;

    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);

    if (isNaN(num1) || isNaN(num2)) {
      this.result = 0;
      this.operation = 'Operação inválida';
      this.displayOperation(this.operation);
      this.displayResult(this.result);
      return;
    }

    switch (operator) {
      case '+':
        this.calcService.add(num1, num2).subscribe(
          response => {
            this.result = response.result;
            this.operation = '+';
            this.displayOperation(this.operation);
            this.displayResult(this.result);
          },
          error => {
            console.error('Erro ao realizar a soma:', error);
          }
        );
        break;
      case '-':
        this.calcService.subtract(num1, num2).subscribe(
          response => {
            this.result = response.result;
            this.operation = '-';
            this.displayOperation(this.operation);
            this.displayResult(this.result);
          },
          error => {
            console.error('Erro ao realizar a subtração:', error);
          }
        );
        break;
      case '*':
        this.calcService.multiply(num1, num2).subscribe(
          response => {
            this.result = response.result;
            this.operation = '*';
            this.displayOperation(this.operation);
            this.displayResult(this.result);
          },
          error => {
            console.error('Erro ao realizar a multiplicação:', error);
          }
        );
        break;
      case '/':
        this.calcService.divide(num1, num2).subscribe(
          response => {
            this.result = response.result;
            this.operation = '/';
            this.displayOperation(this.operation);
            this.displayResult(this.result);
          },
          error => {
            console.error('Erro ao realizar a divisão:', error);
          }
        );
        break;
      default:
        this.result = 0;
        this.operation = 'Operação inválida';
        this.displayOperation(this.operation);
        this.displayResult(this.result);
        break;
    }
  }

  displayOperation(operation: string): void {
    const operationDisplay = document.querySelector('.operation') as HTMLElement;
    operationDisplay.textContent = operation;
  }

  displayResult(result: number | null): void {
    const resultDisplay = document.querySelector('.result') as HTMLElement;
    resultDisplay.textContent = result !== null ? result.toFixed(2).toString() : '';
  }
}
