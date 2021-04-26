import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotyleplanifView1Component } from './cotyleplanif-view1.component';

describe('CotyleplanifView1Component', () => {
  let component: CotyleplanifView1Component;
  let fixture: ComponentFixture<CotyleplanifView1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotyleplanifView1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotyleplanifView1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
