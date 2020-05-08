import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritCoursesComponent } from './favourit-courses.component';

describe('FavouritCoursesComponent', () => {
  let component: FavouritCoursesComponent;
  let fixture: ComponentFixture<FavouritCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouritCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
