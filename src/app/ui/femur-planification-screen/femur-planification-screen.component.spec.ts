import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FemurPlanificationScreenComponent } from './femur-planification-screen.component';

describe('FemurPlanificationScreenComponent', () => {
  let component: FemurPlanificationScreenComponent;
  let fixture: ComponentFixture<FemurPlanificationScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FemurPlanificationScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FemurPlanificationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
