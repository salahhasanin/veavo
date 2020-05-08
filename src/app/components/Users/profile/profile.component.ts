import { UserService } from "./../../../services/user.service";
import { Component, OnInit } from "@angular/core";
// import * as $ from "jquery";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  userData;
  constructor(private userServices: UserService) {}

  ngOnInit() {
    // $(document).ready(function () {
    //   $(function () {
    //     "use strict";
    //     var x = $("container").position();
    //     //alert(x);
    //     console.log(x);
    //   });
    // });

    this.userServices.getUser().subscribe((res) => {
      this.userData = res["user"];
      console.log(this.userData);
    });
  }
}
