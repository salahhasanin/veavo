import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-following-inst",
  templateUrl: "./following-inst.component.html",
  styleUrls: ["./following-inst.component.scss"],
})
export class FollowingInstComponent implements OnInit {
  userData: any;
  instrucrors = [
    {
      title: "Thomas Junior",
      description: "UX Designer",
      img: "../../../assets/login/Path9.png",
    },
    {
      title: "Philip Edison",
      description: "IOS Developer",
      img: "../../../assets/login/Path9-1@2x.png",
    },
    {
      title: "Any Name",
      description: "Musician",
      img: "../../../assets/login/Path9-2@2x.png",
    },
    {
      title: "My Name",
      description: "Android Developer",
      img: "../../../assets/login/Path9-1@2x.png",
    },
  ];
  followingInstrucrors;
  allInstrucrors;
  constructor(private authService: AuthService,private userService: UserService) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
    this.userService.getUser().subscribe((res) => {
      this.userData = res["user"];
      this.userService
        .getAllFollowingInst(this.userData._id)
        .subscribe((result) => {
          this.followingInstrucrors = result;
          this.allInstrucrors = this.followingInstrucrors.follows;
          console.log(this.allInstrucrors);
        });
    });
  }
}
}
