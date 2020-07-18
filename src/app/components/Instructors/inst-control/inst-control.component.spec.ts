import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstControlComponent } from './inst-control.component';

describe('InstControlComponent', () => {
  let component: InstControlComponent;
  let fixture: ComponentFixture<InstControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
