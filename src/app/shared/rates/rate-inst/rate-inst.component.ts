import { InstructorService } from "./../../../services/instructor.service";
import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-rate-inst",
  templateUrl: "./rate-inst.component.html",
  styleUrls: ["./rate-inst.component.scss"],
})
export class RateInstComponent implements OnInit {
  @Input() instId: number;
  userData: any;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private instructorService: InstructorService
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
    this.userService.getUser().subscribe((res) => {
      this.userData = res["user"];
    });
  }
  }

  onRatingSet($event) {
    this.instructorService
      .rateInst(this.userData._id, this.instId, $event)
      .subscribe();
  }
}
