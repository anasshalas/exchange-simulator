import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { interval, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ExchangeRequest } from './exchange-request';

@Component({
  selector: 'app-exchange-rate-calculator',
  templateUrl: './exchange-rate-calculator.component.html',
  // styleUrls: ['./exchange-rate-calculator.component.less']
})
export class ExchangeRateCalculatorComponent implements OnInit {

  public exchangeRate = 1.1;
  public exchangeRateMarket = 1.1;
  public convertedAmount = 0;
  public exchangeCurrency = 'USD';
  public randomValue = 0;
  public gapExchangeRate = 0;
  public exchangeRequestHistory = [];
  private isFixedExchangeRate = false;
  exchangeRateForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log('test');
    this.exchangeRateForm = this.fb.group({
      isFixedExchangeRate: [''],
      amount: [''],
      firstCurrency: ['EUR'],
      secondCurrency: ['USD'],
    });
    interval(3000) // run every 3 second
    .pipe(
    switchMap(() => this.getExchangeRate())
    )
    .subscribe(
    res => {},
    error=>{}
    );
  }

  onChangeCurrency() {
    if(this.exchangeRateForm.controls.firstCurrency.value == 'EUR')
    {
      this.exchangeRateForm.controls.firstCurrency.setValue('USD');
      this.exchangeRateForm.controls.secondCurrency.setValue('EUR');
      this.exchangeCurrency = 'EUR';
      this.exchangeRate = 1 / this.exchangeRate;
    } 
    else {
      this.exchangeRateForm.controls.firstCurrency.setValue('EUR');
      this.exchangeRateForm.controls.secondCurrency.setValue('USD');
      this.exchangeCurrency = 'USD';
      this.exchangeRate = 1 / this.exchangeRate;
    }
    this.calculate(this.exchangeRateForm.controls.amount.value);
  }

  onSubmit() {
    this.calculate(this.exchangeRateForm.controls.amount.value);
    let request = new ExchangeRequest();
    request.realExchangeRequest = this.exchangeRateMarket;
    request.exchangeRequest = this.exchangeRate;
    request.firstCurrency = this.exchangeRateForm.controls.firstCurrency.value;
    request.secondCurrency = this.exchangeRateForm.controls.secondCurrency.value;
    request.amount = this.exchangeRateForm.controls.amount.value;
    request.calculatedAmount = this.convertedAmount;
    this.exchangeRequestHistory.push(request);
    if(this.exchangeRequestHistory.length > 5) {
      this.exchangeRequestHistory = this.exchangeRequestHistory.slice(Math.max(this.exchangeRequestHistory.length - 5, 0)); 
    }
  }

  private calculate(amount: number) {
    this.convertedAmount = amount * this.exchangeRate;
  }

  private getRandomValue(min, max) {
    return (Math.random() * (max - min) + min);
  }

  getExchangeRate(): Observable<void> {
    this.exchangeRateMarket = this.getRandomValue(-0.05, 0.05) + this.exchangeRateMarket;
    this.gapExchangeRate = this.exchangeRateMarket - this.exchangeRate == 0 ? 0 : ((this.exchangeRateMarket - this.exchangeRate) / this.exchangeRate) * 0.01;
    if(this.exchangeRateForm.controls.isFixedExchangeRate.value && (this.gapExchangeRate < -0.02   || this.gapExchangeRate > 0.02)) {
      this.exchangeRateForm.controls.isFixedExchangeRate.setValue(false);
    } 

    if(!this.exchangeRateForm.controls.isFixedExchangeRate.value) {
      this.exchangeRate = this.exchangeRateMarket;
    }
    return new Observable();
  }
}
