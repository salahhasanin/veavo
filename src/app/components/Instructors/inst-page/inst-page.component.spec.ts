import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstPageComponent } from './inst-page.component';

describe('InstPageComponent', () => {
  let component: InstPageComponent;
  let fixture: ComponentFixture<InstPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
