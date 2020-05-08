import { CourseDetailsComponent } from "./components/Courses/course-details/course-details.component";
import { ProfileComponent } from "./components/Users/profile/profile.component";
import { EditProfileComponent } from "./components/Users/edit-profile/edit-profile.component";
import { CreateCourseComponent } from "./components/Instructors/create-course/create-course.component";
import { ContactUsComponent } from "./components/Otherpages/contact-us/contact-us.component";
import { CourseCategoryComponent } from "./components/Courses/course-category/course-category.component";
import { InstPageComponent } from "./components/Instructors/inst-page/inst-page.component";
import { FavouritCoursesComponent } from "./components/Courses/favourit-courses/favourit-courses.component";

import { HomeComponent } from "./components/Otherpages/home/home.component";

// import { CreateCourseComponent } from './components/create-course/create-course.component';

// import { ContactComponent } from './components/contact/contact.component';

import { Routes, RouterModule, CanActivate } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },

  { path: "home", component: HomeComponent },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "edit", component: EditProfileComponent },
  { path: "instructor", component: InstPageComponent },
  {
    path: "favourit",
    component: FavouritCoursesComponent,
    canActivate: [AuthGuard],
  },
  { path: "category/:categoryName", component: CourseCategoryComponent },
  { path: "contact", component: ContactUsComponent },
  { path: "course/:courseId", component: CourseDetailsComponent },
  {
    path: "createcourse",
    component: CreateCourseComponent,
    canActivate: [AuthGuard],
  },
  // { path: "createcourse", component: DetailsCourseComponent },
  { path: "**", component: HomeComponent },
];
