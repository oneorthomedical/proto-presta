import { TestBed } from '@angular/core/testing';

import { FemurMouvementService } from './femur-mouvement.service';

describe('FemurMouvementService', () => {
  let service: FemurMouvementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FemurMouvementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
