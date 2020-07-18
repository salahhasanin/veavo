// import { HomeModule } from "./components/Otherpages/home/home.module";
import { CreateInstGuard } from "./guards/create-inst.guard";
import { UserProfileGuard } from "./guards/user-profile.guard";
import { routes } from "./routes";
// Import rate library
import { NgxStarsModule } from "ngx-stars";
// Import Stripe library
import { NgxStripeModule } from "ngx-stripe";

// // // // // share course link on platforms
// import { ShareButtonsModule } from "ngx-sharebuttons/buttons";
// import { ShareIconsModule } from "ngx-sharebuttons/icons";
// import { ShareButtonsConfig } from "ngx-sharebuttons";
// import {
//   faFacebookSquare,
//   faTwitterSquare,
// } from "@fortawesome/free-brands-svg-icons";
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
import { FormlyModule } from "@ngx-formly/core";
import { FormlyBootstrapModule } from "@ngx-formly/bootstrap";
import { MatVideoModule } from "mat-video";
//resize image
// import { Ng2ImgMaxModule } from "ng2-img-max";
//navbar component
//popup
import { NgxSmartModalModule } from "ngx-smart-modal";
//sidenav
import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatStepperModule,
} from "@angular/material";
// social media
// import {
//   SocialLoginModule,
//   SocialAuthServiceConfig,
// } from "angularx-social-login";
// import {
//   GoogleLoginProvider,
//   FacebookLoginProvider,
// } from "angularx-social-login";
// services
import { UserService } from "./services/user.service";
import { AuthService } from "./services/auth.service";
import { InstructorService } from "./services/instructor.service";
import { GeneralService } from "./services/general.service";
// guard
import { AuthGuard } from "./guards/auth.guard";
// interceptor
import { AuthInterceptor } from "./interceptors/auth.interceptor";
//component
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/layout/navbar/navbar.component";
import { FooterComponent } from "./components/layout/footer/footer.component";
import { FavouritCoursesComponent } from "./components/Courses/favourit-courses/favourit-courses.component";
import { InstPageComponent } from "./components/Instructors/inst-page/inst-page.component";
import { CourseCategoryComponent } from "./components/Courses/course-category/course-category.component";
import { ContactUsComponent } from "./components/Otherpages/contact-us/contact-us.component";
import { CreateCourseComponent } from "./components/Instructors/create-course/create-course.component";
import { EditProfileComponent } from "./components/Users/edit-profile/edit-profile.component";
import { ProfileComponent } from "./components/Users/profile/profile.component";
import { CourseDetailsComponent } from "./components/Courses/course-details/course-details.component";
import { CreateInstComponent } from "./components/Instructors/create-inst/create-inst.component";
import { InstControlComponent } from "./components/Instructors/inst-control/inst-control.component";
import { FavoriteButtonComponent } from "./shared/buttons/favorite-button/favorite-button.component";
import { RateCourseComponent } from "./shared/rates/rate-course/rate-course.component";
import { FollowingInstComponent } from "./components/Instructors/following-inst/following-inst.component";
import { RateInstComponent } from "./shared/rates/rate-inst/rate-inst.component";
// custom pipes
import { AvgRatePipe } from "./shared/pipes/avg-rate.pipe";
import { IntNumberPipe } from "./shared/pipes/int-number.pipe";
import { SearchResultComponent } from "./components/Otherpages/search-result/search-result.component";
import { BookButtonComponent } from "./shared/buttons/book-button/book-button.component";
import { StripecardDialogComponent } from "./shared/payment/stripecard-dialog/stripecard-dialog.component";
import { LoggedinDialogComponent } from "./shared/dialogs/loggedin-dialog/loggedin-dialog.component";

// ngx/formly validation
export function minlengthValidationMessage(err, field) {
  return `Should have at least ${field.templateOptions.minLength} characters`;
}

export function maxlengthValidationMessage(err, field) {
  return `This value should be less than ${field.templateOptions.maxLength} characters`;
}

export function minValidationMessage(err, field) {
  return `This value should be more than ${field.templateOptions.min}`;
}

export function maxValidationMessage(err, field) {
  return `This value should be less than ${field.templateOptions.max}`;
}
// const customConfig: ShareButtonsConfig = {
//   prop: {
//     facebook: {
//       icon: ["fab", "fa-facebook-official"],
//       text: "Share",
//     },
//     twitter: {
//       icon: ["fab", "fa-twitter-square"],
//       text: "Tweet",
//     },
//     linkedin: {
//       icon: ["fab", "fa-twitter-square"],
//       text: "Post",
//     },
//     reddit: {
//       icon: ["fab", "fa-twitter-square"],
//       text: "Post",
//     },
//     whatsapp: {
//       icon: ["fab", "fa-twitter-square"],
//       text: "Send",
//     },
//   },
//   include: ["facebook", "twitter", "linkedin", "reddit", "whatsapp"],
//   // exclude: ["tumblr", "stumble", "vk"],

//   theme: "circles-dark",
//   autoSetMeta: true,
//   // twitterAccount: 'twitterUsername'
// };
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    FavouritCoursesComponent,
    InstPageComponent,
    CourseCategoryComponent,
    ContactUsComponent,
    CreateCourseComponent,
    EditProfileComponent,
    ProfileComponent,
    CourseDetailsComponent,
    CreateInstComponent,
    InstControlComponent,
    FavoriteButtonComponent,
    RateCourseComponent,
    IntNumberPipe,
    FollowingInstComponent,
    RateInstComponent,
    AvgRatePipe,
    SearchResultComponent,
    BookButtonComponent,
    StripecardDialogComponent,
    LoggedinDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // HomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatVideoModule,
    // ShareButtonsModule.withConfig(customConfig),
    // ShareIconsModule,
    NgxStarsModule,
    NgxSmartModalModule.forRoot(),
    NgCircleProgressModule.forRoot({}),
    RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" }),
    NgxStripeModule.forRoot("pk_test_PD9i0uvMBBy1to3zR8QdFR7x"),
    MatStepperModule,
    // SocialLoginModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      // types: [
      //   { name: "repeat", component: RepeatTypeComponent },
      //   { name: "file", component: FormlyFieldFile, wrappers: ["form-field"] },
      // ],
      validationMessages: [
        { name: "required", message: "This field is required" },
        { name: "minlength", message: minlengthValidationMessage },
        { name: "maxlength", message: maxlengthValidationMessage },
        { name: "min", message: minValidationMessage },
        { name: "max", message: maxValidationMessage },
      ],
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    InstructorService,
    AuthService,
    UserService,
    GeneralService,
    UserProfileGuard,
    CreateInstGuard,
    // {
    //   provide: "SocialAuthServiceConfig",
    //   useValue: {
    //     autoLogin: false,
    //     providers: [
    //       {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider(environment.googleClientApi),
    //       },
    //       {
    //         id: FacebookLoginProvider.PROVIDER_ID,
    //         provider: new FacebookLoginProvider(environment.facebookAppId),
    //       },
    //     ],
    //   } as SocialAuthServiceConfig,
    // },
  ],
  // exports: [HomeComponent],
  bootstrap: [AppComponent],
  entryComponents: [StripecardDialogComponent, LoggedinDialogComponent],
})
export class AppModule {}
