import { SearchResultComponent } from "./components/Otherpages/search-result/search-result.component";
import { FollowingInstComponent } from "./components/Instructors/following-inst/following-inst.component";
import { InstControlComponent } from "./components/Instructors/inst-control/inst-control.component";
import { CreateInstGuard } from "./guards/create-inst.guard";
import { UserProfileGuard } from "./guards/user-profile.guard";
import { CreateInstComponent } from "./components/Instructors/create-inst/create-inst.component";
import { CourseDetailsComponent } from "./components/Courses/course-details/course-details.component";
import { ProfileComponent } from "./components/Users/profile/profile.component";
import { EditProfileComponent } from "./components/Users/edit-profile/edit-profile.component";
import { CreateCourseComponent } from "./components/Instructors/create-course/create-course.component";
import { ContactUsComponent } from "./components/Otherpages/contact-us/contact-us.component";
import { CourseCategoryComponent } from "./components/Courses/course-category/course-category.component";
import { InstPageComponent } from "./components/Instructors/inst-page/inst-page.component";
import { FavouritCoursesComponent } from "./components/Courses/favourit-courses/favourit-courses.component";

// import { HomeComponent } from "./components/Otherpages/home/home.component";

import { Routes, RouterModule, CanActivate } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";

export const routes: Routes = [
  // {
  //   path: "",
  //   redirectTo: "/home",
  //   pathMatch: "full",
  // },

  // { path: "home", component: HomeComponent },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "home",
    loadChildren: () =>
      import("./components/Otherpages/home/home.module").then(
        (m) => m.HomeModule
      ),
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard, UserProfileGuard],
  },
  { path: "edit", component: EditProfileComponent },
  { path: "instpage/:instID", component: InstPageComponent },
  { path: "instcontrol", component: InstControlComponent },

  {
    path: "favourit",
    component: FavouritCoursesComponent,
    canActivate: [AuthGuard, UserProfileGuard],
  },
  {
    path: "following",
    component: FollowingInstComponent,
    canActivate: [AuthGuard, UserProfileGuard],
  },

  { path: "category/:categoryName", component: CourseCategoryComponent },
  { path: "contact", component: ContactUsComponent },
  { path: "course/:courseId", component: CourseDetailsComponent },
  {
    path: "createcourse",
    component: CreateCourseComponent,
    canActivate: [AuthGuard, UserProfileGuard, CreateInstGuard],
  },
  { path: "search/:searchvalue", component: SearchResultComponent },

  {
    path: "createinst",
    component: CreateInstComponent,
    canActivate: [AuthGuard, UserProfileGuard],
  },
  {
    path: "**",
    loadChildren: () =>
      import("./components/Otherpages/home/home.module").then(
        (m) => m.HomeModule
      ),
  },
  // {
  //   path: "**",
  //   component: HomeComponent,
  // },
];
