import { TestBed } from '@angular/core/testing';

import { DataSymfonyService } from './data-symfony.service';

describe('DataSymfonyService', () => {
  let service: DataSymfonyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSymfonyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
