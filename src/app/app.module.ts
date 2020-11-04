import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExchangeRateManagementModule } from 'src/modules/exchange-rate-management/exchange-rate-management.module';
import { ExchangeRateCalculatorComponent } from 'src/modules/exchange-rate-management/exchange-rate-calculator/exchange-rate-calculator.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ExchangeRateManagementModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
