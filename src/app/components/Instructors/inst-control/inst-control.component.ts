import { UserService } from "./../../../services/user.service";
import { InstructorService } from "./../../../services/instructor.service";
import { Router } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "src/app/shared/models/course.model";
import { AuthService } from "src/app/services/auth.service";
@Component({
  selector: "app-inst-control",
  templateUrl: "./inst-control.component.html",
  styleUrls: ["./inst-control.component.scss"],
})
export class InstControlComponent implements OnInit, OnDestroy {
  userData: any;
  instructorData;
  allCourses;
  allFollowers;
  instSubscribe;
  mycouses = true;
  myfollowers = false;
  constructor(
    private router: Router,
    private instructorService: InstructorService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.userService.getUser().subscribe((res) => {
        this.userData = res["user"];

        this.instSubscribe = this.instructorService
          .getInstCourses(this.userData._id)
          .subscribe((res) => {
            this.instructorData = res;
            this.allCourses = this.instructorData.myCourses;
            this.allFollowers = this.instructorData.followers;
            console.log(this.instructorData);
          });
      });
    }
  }

  createCourse() {
    this.router.navigateByUrl("/createcourse");
  }

  showItem(item) {
    switch (item) {
      case "mycouses":
        this.mycouses = true;
        this.myfollowers = false;
        break;
      case "myfollowers":
        this.mycouses = false;
        this.myfollowers = true;
        break;
      default:
        this.mycouses = true;
        this.myfollowers = false;
        break;
    }
  }

  ngOnDestroy() {}
}
