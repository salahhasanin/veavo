import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripecardDialogComponent } from './stripecard-dialog.component';

describe('StripecardDialogComponent', () => {
  let component: StripecardDialogComponent;
  let fixture: ComponentFixture<StripecardDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripecardDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripecardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
