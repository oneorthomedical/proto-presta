import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FemurplanifView4Component } from './femurplanif-view4.component';

describe('FemurplanifView4Component', () => {
  let component: FemurplanifView4Component;
  let fixture: ComponentFixture<FemurplanifView4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FemurplanifView4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FemurplanifView4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
