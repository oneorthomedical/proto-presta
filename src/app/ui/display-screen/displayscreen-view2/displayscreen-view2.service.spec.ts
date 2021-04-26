import { TestBed } from '@angular/core/testing';

import { DisplayscreenView2Service } from './displayscreen-view2.service';

describe('DisplayscreenView2Service', () => {
  let service: DisplayscreenView2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayscreenView2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
