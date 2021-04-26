import {TestBed} from '@angular/core/testing';
import {DataLocalService} from './data-local.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Observable} from 'rxjs';

describe('DataSymfonyService', () => {
  let service: DataLocalService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  });
  beforeEach(() => service = TestBed.inject(DataLocalService));
  beforeEach(() => httpTestingController = TestBed.inject(HttpTestingController));
  afterEach(() => {
    httpTestingController.verify();
  });
  it('should be return Observable of localData', () => {
    expect(service.getLocalData).toBeDefined(Observable);
  });
  it('should be return Observable of RightMenu', () => {
    expect(service.getRightMenuData).toBeDefined(Observable);
  });
  it('should be return Observable of BottomMenu', () => {
    expect(service.getBottomMenuData).toBeDefined(Observable);
  });
});
