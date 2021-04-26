import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FemurPadComponent } from './femur-pad.component';

describe('FemurPadComponent', () => {
  let component: FemurPadComponent;
  let fixture: ComponentFixture<FemurPadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FemurPadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FemurPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
