import { Component, inject } from '@angular/core';
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
  
  
  private http : CalcService = inject(CalcService);

  performOperation(operator: string): void {
    const value1 = (document.querySelector('.input-top') as HTMLInputElement).value;
    const value2 = (document.querySelector('.input-middle') as HTMLInputElement).value;

    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);

    let result: any ;
    let operation: string = '';

    switch (operator) {
      case '+':
        if(isNaN(num1) || isNaN(num2)) {
          result = 0
        }
        else{
          this.http.add(num1,num2).then(response => {
            this.displayOperation(operator);
            this.displayResult(response.result);
          }).catch(error => {
            console.error(`Erro ao realizar a operação ${operator}:`, error);
            this.displayOperation(`Erro: ${error.message}`);
            this.displayResult(null);
          })
        }
        break;
      case '-':
        if(isNaN(num1) || isNaN(num2)) {
          result = 0
        }
        else {
          this.http.subtract(num1,num2).then(response => {
            this.displayOperation(operator);
            this.displayResult(response.result);
          }).catch(error => {
            console.error(`Erro ao realizar a operação ${operator}:`, error);
            this.displayOperation(`Erro: ${error.message}`);
            this.displayResult(null);
          })
        }
        break;
      case '*':
        if(isNaN(num1) || isNaN(num2)) {
          result = 0
        }
        else {
          this.http.multiply(num1,num2).then(response => {
            this.displayOperation(operator);
            this.displayResult(response.result);
          }).catch(error => {
            console.error(`Erro ao realizar a operação ${operator}:`, error);
            this.displayOperation(`Erro: ${error.message}`);
            this.displayResult(null);
          })
        }
        break;
      case '/':
        if (num2 === 0) {
          result = result;
          operation = 'Divisão por zero não é permitida';
        }
        else if(isNaN(num1) || isNaN(num2)) {
          result = 0
        } else {
          this.http.divide(num1,num2).then(response => {
            this.displayOperation(operator);
            this.displayResult(response.result);
          }).catch(error => {
            console.error(`Erro ao realizar a operação ${operator}:`, error);
            this.displayOperation(`Erro: ${error.message}`);
            this.displayResult(null);
          })
        }
        break;
      default:
        result = 0;
        operation = 'Operação inválida';
        break;
    }

    this.displayOperation(operation);
    this.displayResult(result);
  }

  displayOperation(operation: string): void {
    const operationDisplay = document.querySelector('.operation') as HTMLElement;
    operationDisplay.textContent = operation;
  }

  displayResult(result: number | null): void {
    console.log(result)
    const resultDisplay = document.querySelector('.result') as HTMLElement;
    if(result != null && result != undefined)
    resultDisplay.textContent = result.toFixed(2).toString();
  }
}
