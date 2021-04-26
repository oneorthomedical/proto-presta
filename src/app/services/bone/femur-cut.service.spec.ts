import { TestBed } from '@angular/core/testing';

import { FemurCutService } from './femur-cut.service';

describe('FemurCutService', () => {
  let service: FemurCutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FemurCutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
