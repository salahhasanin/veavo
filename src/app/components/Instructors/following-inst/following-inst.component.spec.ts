import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingInstComponent } from './following-inst.component';

describe('FollowingInstComponent', () => {
  let component: FollowingInstComponent;
  let fixture: ComponentFixture<FollowingInstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowingInstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowingInstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
