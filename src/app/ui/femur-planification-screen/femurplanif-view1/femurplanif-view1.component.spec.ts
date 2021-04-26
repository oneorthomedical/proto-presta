import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FemurplanifView1Component } from './femurplanif-view1.component';

describe('FemurplanifView1Component', () => {
  let component: FemurplanifView1Component;
  let fixture: ComponentFixture<FemurplanifView1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FemurplanifView1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FemurplanifView1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
