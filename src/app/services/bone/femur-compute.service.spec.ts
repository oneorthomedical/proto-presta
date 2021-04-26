import { TestBed } from '@angular/core/testing';

import { FemurComputeService } from './femur-compute.service';

describe('FemurComputeService', () => {
  let service: FemurComputeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FemurComputeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
