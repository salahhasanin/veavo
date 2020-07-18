import { Observable } from "rxjs";
import { User } from "./../../../models/user.model";
import { UserService } from "src/app/services/user.service";
import { CourseService } from "src/app/services/course.service";
import { AuthService } from "./../../../services/auth.service";
import { Course } from "./../../models/course.model";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-favorite-button",
  templateUrl: "./favorite-button.component.html",
  styleUrls: ["./favorite-button.component.scss"],
})
export class FavoriteButtonComponent implements OnInit {
  @Input() course: Course;
  @Input() courseId: number;
  @Input() user: Object;

  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;
  userData: any;
  courseExsist: boolean;
  allFavouriteCourses: [number];
  constructor(
    private router: Router,
    private authService: AuthService,
    private courseService: CourseService,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
    this.userService.getUser().subscribe((res) => {
      this.userData = res["user"];
      // this.userService.allFavouriteCourses = this.userData.favouriteCourses;
      if (this.userData.favouriteCourses.includes(this.courseId)) {
        this.courseExsist = true;
      } else {
        this.courseExsist = false;
      }
    });
  }
    // console.log(this.userService.allFavouriteCourses);
  }

  toggleFavorite() {
    this.isSubmitting = true;

    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl("/home");
      return false;
    }

    if (!this.userService.allFavouriteCourses.includes(this.courseId)) {
      this.courseExsist = true;
      this.userService.allFavouriteCourses.push(this.courseId);
      this.userService
        .addFavouritCourse(this.userData._id, this.courseId)
        .subscribe(
          (res) => {
            this.isSubmitting = false;
            this.toggle.emit(true);
          },
          (err) => {
            this.isSubmitting = false;
          }
        );
    } else {
      this.courseExsist = false;
      this.userService.allFavouriteCourses.splice(
        this.userService.allFavouriteCourses.indexOf(this.courseId),
        1
      );
      this.userService
        .removeFavouritCourse(this.userData._id, this.courseId)
        .subscribe(
          (res) => {
            this.isSubmitting = false;
            this.toggle.emit(false);
          },
          (err) => {
            this.isSubmitting = false;
          }
        );
    }
  }
}
