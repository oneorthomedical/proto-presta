import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotylePadComponent } from './cotyle-pad.component';

describe('CotylePadComponent', () => {
  let component: CotylePadComponent;
  let fixture: ComponentFixture<CotylePadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotylePadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotylePadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
