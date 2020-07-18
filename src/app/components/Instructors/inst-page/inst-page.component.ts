import { UserService } from "src/app/services/user.service";
import { InstructorService } from "./../../../services/instructor.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-inst-page",
  templateUrl: "./inst-page.component.html",
  styleUrls: ["./inst-page.component.scss"],
})
export class InstPageComponent implements OnInit, OnDestroy {
  totalRate = 1;
  fourite = [];
  indexs;
  productItem;
  instId: String;
  instructorDetails: any;
  userDetails: any;
  allInstData: any;
  following: any;
  userData: any;

  constructor(
    private route: ActivatedRoute,
    private instructorService: InstructorService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.instId = this.route.snapshot.paramMap.get("instID");
    this.allInstData = this.instructorService
      .getInstructorData(this.instId)
      .subscribe((res) => {
        this.instructorDetails = res[0];
        this.userDetails = res[1];
      });
      if (this.authService.isLoggedIn()) {
    this.userService.getUser().subscribe((res) => {
      this.userData = res["user"];
    });
  }
  }
  y = [
    {
      id: 1,
      title: "Course Title Goes Here  ",
      description:
        "Jose Portila sasdunc huebcubuce budbcub 9vudhug dsgbc hjh yg f hgygyefdv 7fgch f7fdycc",
      buttonText: "100% Off",
      anotherDiscount: "30.70 LE",
      Discount: "20.70 LE",
      img: "../../../assets/home/cardIMG.png",
      category: "IT",
      location: "cairo",
      coursRegistration: 10,
    },
    {
      id: 2,
      title: "Course Title Goes Here",
      description: "Jose Portila sasdunc huebcubuce budbcub 9vudhug",
      buttonText: "70% Off",
      anotherDiscount: "30.70 LE",
      Discount: "20.70 LE",
      img: "../../../assets/home/cardIMG.png",
      category: "IT",
      location: "cairo",
      coursRegistration: 20,
    },
    {
      id: 3,
      title: "Course Title Goes Here",
      description: "Jose Portila sasdunc huebcubuce budbcub 9vudhug",
      buttonText: "55% Off",
      anotherDiscount: "30.70 LE",
      Discount: "20.70 LE",
      img: "../../../assets/home/cardIMG.png",
      category: "IT",
      location: "cairo",
      coursRegistration: 40,
    },
    {
      id: 4,
      title: "Course Title Goes Here",
      description:
        "Jose Portila sasdunc huebcubuce budbcub 9vudhuge doifhb ubdfu b uuge",
      buttonText: "30% Off",
      anotherDiscount: "30.70 LE",
      Discount: "20.70 LE",
      img: "../../../assets/home/cardIMG.png",
      category: "IT",
      location: "cairo",
      coursRegistration: 70,
    },
    {
      id: 5,
      title: "Course Title Goes Here",
      description: "Jose Portila",
      buttonText: "30% Off",
      anotherDiscount: "30.70 LE",
      Discount: "20.70 LE",
      img: "../../../assets/home/cardIMG.png",
      category: "IT",
      location: "cairo",
      coursRegistration: 57,
    },
    {
      id: 6,
      title: "Course Title Goes Here",
      description: "Jose Portila",
      buttonText: "30% Off",
      anotherDiscount: "30.70 LE",
      Discount: "20.70 LE",
      img: "../../../assets/home/cardIMG.png",
      category: "cooking",
      location: "cairo",
      coursRegistration: 80,
    },
    {
      id: 7,
      title: "Course Title Goes Here",
      description: "Jose Portila",
      buttonText: "30% Off",
      anotherDiscount: "30.70 LE",
      Discount: "20.70 LE",
      img: "../../../assets/home/cardIMG.png",
      category: "photography",
      location: "cairo",
      coursRegistration: 90,
    },
    {
      id: 8,
      title: "Course Title Goes Here",
      description: "Jose Portila",
      buttonText: "30% Off",
      anotherDiscount: "30.70 LE",
      Discount: "20.70 LE",
      img: "../../../assets/home/cardIMG.png",
      category: "photography",
      location: "cairo",
      coursRegistration: 90,
    },
    {
      id: 9,
      title: "Course Title Goes Here",
      description: "Jose Portila",
      buttonText: "30% Off",
      anotherDiscount: "30.70 LE",
      Discount: "20.70 LE",
      img: "../../../assets/home/cardIMG.png",
      category: "photography",
      location: "cairo",
      coursRegistration: 90,
    },
    {
      id: 10,
      title: "Course Title Goes Here",
      description: "Jose Portila",
      buttonText: "30% Off",
      anotherDiscount: "30.70 LE",
      Discount: "20.70 LE",
      img: "../../../assets/home/cardIMG.png",
      category: "photography",
      location: "cairo",
      coursRegistration: 90,
    },
  ];

  onRatingSet($event) {
    this.totalRate = $event;
    // alert(`Rating is ${$event}`);
  }

  addFavourite(id, index) {
    console.log(index);
    this.indexs = index;
    if (this.fourite.indexOf(id) !== -1) {
      this.productItem = this.fourite.indexOf(id);
      this.fourite.splice(this.productItem, 1);
    } else {
      this.fourite.push(id);
    }
  }

  followInst() {
    this.following = this.userService
      .followInstructor(this.userData._id, this.instructorDetails._id)
      .subscribe((res) => {
        console.log(res);
      });
  }
  ngOnDestroy() {
    this.allInstData.unsubscribe();
    // this.following.unsubscribe();
  }
}
