import { TestBed } from '@angular/core/testing';

import { ExchangeRateCalculatorService } from './exchange-rate-calculator.service';

describe('ExchangeRateCalculatorService', () => {
  let service: ExchangeRateCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExchangeRateCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
