import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeRateCalculatorComponent } from './exchange-rate-calculator/exchange-rate-calculator.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ExchangeRateCalculatorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [ExchangeRateCalculatorComponent]
})
export class ExchangeRateManagementModule { }
