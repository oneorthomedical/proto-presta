import { TestBed } from '@angular/core/testing';

import { HeadCenterService } from './head-center.service';

describe('HeadCenterService', () => {
  let service: HeadCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeadCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
