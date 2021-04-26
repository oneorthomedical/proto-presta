import { TestBed } from '@angular/core/testing';

import { CotyleplanifView1Service } from './cotyleplanif-view1.service';

describe('CotyleplanifView1Service', () => {
  let service: CotyleplanifView1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CotyleplanifView1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
