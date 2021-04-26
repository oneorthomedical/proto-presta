import { TestBed } from '@angular/core/testing';

import { CotyleplanifView2Service } from './cotyleplanif-view2.service';

describe('CotyleplanifView2Service', () => {
  let service: CotyleplanifView2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CotyleplanifView2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
