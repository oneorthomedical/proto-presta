import { TestBed } from '@angular/core/testing';

import { FemurSliderHelperService } from './femur-slider-helper.service';

describe('FemurSliderHelperService', () => {
  let service: FemurSliderHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FemurSliderHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
