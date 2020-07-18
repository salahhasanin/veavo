import { UserService } from "./../../../services/user.service";
import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-rate-course",
  templateUrl: "./rate-course.component.html",
  styleUrls: ["./rate-course.component.scss"],
})
export class RateCourseComponent implements OnInit {
  @Input() courseId: number;
  @Input() courseRate: [];
  userData: any;
  constructor(private authService: AuthService,private userService: UserService) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
    this.userService.getUser().subscribe((res) => {
      this.userData = res["user"];
      // console.log(this.courseRate);
    });
  }
  }
  onRatingSet($event) {
    this.userService
      .rateCourse(this.userData._id, this.courseId, $event)
      .subscribe();
  }
}
