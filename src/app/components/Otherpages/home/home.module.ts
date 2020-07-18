// import { FavoriteButtonComponent } from "./../../../shared/buttons/favorite-button/favorite-button.component";
// import { RateCourseComponent } from "./../../../shared/rates/rate-course/rate-course.component";
import { HomeComponent } from "./home.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// Import carousel library
import { OwlModule } from "ngx-owl-carousel";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { NgCircleProgressModule } from "ng-circle-progress";
import { NgxStarsModule } from "ngx-stars";
import { ReactiveFormsModule } from "@angular/forms";

import { HomeRoutingModule } from "./home-routing.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    OwlModule,
    NgxStarsModule,
    NgCircleProgressModule.forRoot({}),
    CarouselModule.forRoot(),
  ],
  // exports: [HomeComponent],
})
export class HomeModule {}
