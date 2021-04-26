import { TestBed } from '@angular/core/testing';

import { IsPlanificationAuthGuard } from './is-planification-auth.guard';

describe('IsPlanificationAuthGuard', () => {
  let guard: IsPlanificationAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsPlanificationAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
