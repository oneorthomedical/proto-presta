import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotyleplanifView2Component } from './cotyleplanif-view2.component';

describe('CotyleplanifView2Component', () => {
  let component: CotyleplanifView2Component;
  let fixture: ComponentFixture<CotyleplanifView2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotyleplanifView2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotyleplanifView2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
