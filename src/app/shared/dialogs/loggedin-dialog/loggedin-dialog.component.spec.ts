import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedinDialogComponent } from './loggedin-dialog.component';

describe('LoggedinDialogComponent', () => {
  let component: LoggedinDialogComponent;
  let fixture: ComponentFixture<LoggedinDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedinDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedinDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
