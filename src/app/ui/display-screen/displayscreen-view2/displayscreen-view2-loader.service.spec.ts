import { TestBed } from '@angular/core/testing';

import { DisplayscreenView2LoaderService } from './displayscreen-view2-loader.service';

describe('DisplayscreenView2LoaderService', () => {
  let service: DisplayscreenView2LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayscreenView2LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
