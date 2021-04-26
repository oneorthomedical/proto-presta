import { TestBed } from '@angular/core/testing';

import { CotyleplanifLoader2Service } from './cotyleplanif-loader2.service';

describe('CotyleplanifLoader2Service', () => {
  let service: CotyleplanifLoader2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CotyleplanifLoader2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
