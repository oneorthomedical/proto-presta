import { TestBed } from '@angular/core/testing';

import { FemurplanifView4Service } from './femurplanif-view4.service';

describe('FemurplanifView4Service', () => {
  let service: FemurplanifView4Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FemurplanifView4Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
