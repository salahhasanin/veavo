import { UserService } from "./../../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
// import * as $ from "jquery";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  userData;
  constructor(
    private authService: AuthService,
    private userServices: UserService
  ) {}

  ngOnInit() {
    // $(document).ready(function () {
    //   $(function () {
    //     "use strict";
    //     var x = $("container").position();
    //     //alert(x);
    //     console.log(x);
    //   });
    // });
    if (this.authService.isLoggedIn()) {
      this.userServices.getUser().subscribe((res) => {
        this.userData = res["user"];
      });
    }
  }
}
