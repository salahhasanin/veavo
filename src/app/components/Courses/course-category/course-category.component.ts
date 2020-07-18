import { AuthService } from "./../../../services/auth.service";
import { UserService } from "./../../../services/user.service";
import { Course } from "src/app/shared/models/course.model";
import { Observable } from "rxjs";
import { CourseService } from "src/app/services/course.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-course-category",
  templateUrl: "./course-category.component.html",
  styleUrls: ["./course-category.component.scss"],
})
export class CourseCategoryComponent implements OnInit {
  totalRate = 1;
  fourite = [];
  indexs;
  productItem;
  categoryName: String;
  allCourses;

  courses$: Observable<Course[]>;
  userData: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.categoryName = this.route.snapshot.paramMap.get("categoryName");

    // this.courses$ = this.courseService.getCoursesCategory(this.categoryName);
    // console.log(this.courses$ );
    this.courseService
      .getCoursesCategory(this.categoryName)
      .subscribe((res) => {
        this.allCourses = res;
      });
    if (this.authService.isLoggedIn()) {
      this.userService.getUser().subscribe((res) => {
        this.userData = res["user"];
      });
    }
  }
  onRatingSet($event) {
    this.totalRate = $event;
  }
  // addFavourite(id, index) {
  //   this.indexs = index;
  //   if (this.fourite.indexOf(id) !== -1) {
  //     this.productItem = this.fourite.indexOf(id);
  //     this.fourite.splice(this.productItem, 1);
  //   } else {
  //     this.fourite.push(id);
  //   }
  // }
  // sortPrice(price) {
  //   switch (price) {
  //     case "allCourses": {
  //       this.allCourses = this.allCourses.sort(function (low, high) {
  //         if (low.createdAt < high.createdAt) {
  //           return -1;
  //         } else if (low.createdAt > high.createdAt) {
  //           return 1;
  //         } else {
  //           return 0;
  //         }
  //       });
  //       break;
  //     }
  //     case "lowPrice": {
  //       this.allCourses = this.allCourses.sort(
  //         (low, high) => low.salary - high.salary
  //       );
  //       break;
  //     }

  //     case "highPrice": {
  //       this.allCourses = this.allCourses.sort(
  //         (low, high) => high.salary - low.salary
  //       );
  //       break;
  //     }
  //     case "createdAt": {
  //       this.allCourses = this.allCourses.sort(function (low, high) {
  //         if (low.courseStart < high.courseStart) {
  //           return -1;
  //         } else if (low.courseStart > high.courseStart) {
  //           return 1;
  //         } else {
  //           return 0;
  //         }
  //       });
  //       break;
  //     }
  //     default: {
  //       this.allCourses = this.allCourses.sort(function (low, high) {
  //         if (low.createdAt < high.createdAt) {
  //           return -1;
  //         } else if (low.createdAt > high.createdAt) {
  //           return 1;
  //         } else {
  //           return 0;
  //         }
  //       });
  //       break;
  //     }
  //   }
  //   return this.allCourses;
  // }

  onToggleFavorite(favorited: boolean) {
    console.log("added");
  }
  //to send courseId in route using service
  // goToCourseDetails(course_Id) {
  //   this.courseService.courseIdEmitter.next(course_Id);
  //   // this.courseService.accessCourseId = course_Id;
  //   this.router.navigate(["/course/corsedetails"]);
  // }
}
