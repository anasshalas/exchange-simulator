import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeRateCalculatorComponent } from './exchange-rate-calculator.component';

describe('ExchangeRateCalculatorComponent', () => {
  let component: ExchangeRateCalculatorComponent;
  let fixture: ComponentFixture<ExchangeRateCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeRateCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeRateCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
