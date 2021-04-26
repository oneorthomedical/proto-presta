import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayscreenView2Component } from './displayscreen-view2.component';

describe('DisplayscreenView2Component', () => {
  let component: DisplayscreenView2Component;
  let fixture: ComponentFixture<DisplayscreenView2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayscreenView2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayscreenView2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
