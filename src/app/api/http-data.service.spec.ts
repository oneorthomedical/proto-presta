import { TestBed } from '@angular/core/testing';

import { HttpDataService } from './http-data.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('HttpDataService', () => {
  let service: HttpDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HttpDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
