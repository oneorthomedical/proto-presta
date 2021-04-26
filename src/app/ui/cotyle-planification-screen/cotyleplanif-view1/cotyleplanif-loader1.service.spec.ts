import { TestBed } from '@angular/core/testing';

import { CotyleplanifLoader1Service } from './cotyleplanif-loader1.service';

describe('CotyleplanifLoader1Service', () => {
  let service: CotyleplanifLoader1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CotyleplanifLoader1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
