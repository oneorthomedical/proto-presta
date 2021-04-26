import { TestBed } from '@angular/core/testing';

import { DisplayscreenView1LoaderService } from './displayscreen-view1-loader.service';

describe('DisplayscreenView1LoaderService', () => {
  let service: DisplayscreenView1LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayscreenView1LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
