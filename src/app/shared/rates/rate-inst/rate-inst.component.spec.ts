import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateInstComponent } from './rate-inst.component';

describe('RateInstComponent', () => {
  let component: RateInstComponent;
  let fixture: ComponentFixture<RateInstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateInstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateInstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
