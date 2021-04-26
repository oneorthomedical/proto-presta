import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayscreenView1Component } from './displayscreen-view1.component';

describe('DisplayscreenView1Component', () => {
  let component: DisplayscreenView1Component;
  let fixture: ComponentFixture<DisplayscreenView1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayscreenView1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayscreenView1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
