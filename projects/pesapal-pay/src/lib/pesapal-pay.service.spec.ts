import { TestBed } from '@angular/core/testing';

import { PesapalPayService } from './pesapal-pay.service';

describe('PesapalPayService', () => {
  let service: PesapalPayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PesapalPayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
