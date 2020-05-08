import { routes } from "./routes";
import { OwlModule } from "ngx-owl-carousel";
//Import ng-ng-starrating to use in ratea
// import { RatingModule } from "ng-starrating";
import { NgxStarsModule } from "ngx-stars";
// Import ng-circle-progress
import { NgCircleProgressModule } from "ng-circle-progress";
//module
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CarouselModule } from "ngx-bootstrap/carousel";

/////////navbar component
//popup
import { NgxSmartModalModule } from "ngx-smart-modal";
//sidenav
import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
} from "@angular/material";
// services
import { UserService } from "./services/user.service";
import { AuthService } from "./services/auth.service";
import { InstructorService } from "./services/instructor.service";
// guard
import { AuthGuard } from "./guards/auth.guard";
// interceptor
import { AuthInterceptor } from "./interceptors/auth.interceptor";
//component
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/layout/navbar/navbar.component";
import { FooterComponent } from "./components/layout/footer/footer.component";
import { HomeComponent } from "./components/Otherpages/home/home.component";
import { FavouritCoursesComponent } from "./components/Courses/favourit-courses/favourit-courses.component";
import { InstPageComponent } from "./components/Instructors/inst-page/inst-page.component";
import { CourseCategoryComponent } from "./components/Courses/course-category/course-category.component";
import { ContactUsComponent } from "./components/Otherpages/contact-us/contact-us.component";
import { CreateCourseComponent } from "./components/Instructors/create-course/create-course.component";
import { EditProfileComponent } from "./components/Users/edit-profile/edit-profile.component";
import { ProfileComponent } from "./components/Users/profile/profile.component";
import { CourseDetailsComponent } from "./components/Courses/course-details/course-details.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    FavouritCoursesComponent,
    InstPageComponent,
    CourseCategoryComponent,
    ContactUsComponent,
    CreateCourseComponent,
    EditProfileComponent,
    ProfileComponent,
    CourseDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    OwlModule,
    // RatingModule,
    NgxStarsModule,
    NgxSmartModalModule.forRoot(),
    NgCircleProgressModule.forRoot({}),
    RouterModule.forRoot(routes),
    CarouselModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    InstructorService,
    AuthService,
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
