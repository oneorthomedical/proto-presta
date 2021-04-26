import { TestBed } from '@angular/core/testing';

import { FemurplanifView1Service } from './femurplanif-view1.service';

describe('FemurplanifView1Service', () => {
  let service: FemurplanifView1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FemurplanifView1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
