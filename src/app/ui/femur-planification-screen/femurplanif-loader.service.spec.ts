import { TestBed } from '@angular/core/testing';

import { FemurplanifLoaderService } from './femurplanif-loader.service';

describe('FemurplanifLoaderService', () => {
  let service: FemurplanifLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FemurplanifLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
