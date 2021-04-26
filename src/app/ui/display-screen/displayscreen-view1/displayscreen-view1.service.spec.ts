import { TestBed } from '@angular/core/testing';

import { DisplayscreenView1Service } from './displayscreen-view1.service';

describe('DisplayscreenView1Service', () => {
  let service: DisplayscreenView1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayscreenView1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
