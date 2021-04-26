import { TestBed } from '@angular/core/testing';

import { SphereLoaderService } from './sphere-loader.service';

describe('SphereLoaderService', () => {
  let service: SphereLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SphereLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
