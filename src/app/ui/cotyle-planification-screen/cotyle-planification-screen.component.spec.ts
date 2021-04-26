import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotylePlanificationScreenComponent } from './cotyle-planification-screen.component';

describe('CotylePlanificationScreenComponent', () => {
  let component: CotylePlanificationScreenComponent;
  let fixture: ComponentFixture<CotylePlanificationScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotylePlanificationScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotylePlanificationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
