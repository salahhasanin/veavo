import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInstComponent } from './create-inst.component';

describe('CreateInstComponent', () => {
  let component: CreateInstComponent;
  let fixture: ComponentFixture<CreateInstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
