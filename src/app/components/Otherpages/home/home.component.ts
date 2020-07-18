import { GeneralService } from "./../../../services/general.service";
import { Component, OnInit, HostListener } from "@angular/core";
import { NgxSmartModalService } from "ngx-smart-modal";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";

// import { StarRatingComponent } from "ng-starrating";
import { CarouselConfig } from "ngx-bootstrap/carousel";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  host: {
    "(window:resize)": "onWindowResize($event)",
  },
  providers: [
    {
      provide: CarouselConfig,
      useValue: { interval: 5000, noPause: true, showIndicators: true },
    },
  ],
})
export class HomeComponent implements OnInit {
  showIndicators = true;
  itemsPerSlide = 4;
  width: number = window.innerWidth;
  searchformm: FormGroup;
  totalRate = 1;
  fourite = [];
  indexs;
  productItem;
  homeDataSubscribe: any;
  newCourses: any;
  topRatedCourses: any;
  topRatedInst: any;

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    public fb: FormBuilder,
    private generalService: GeneralService
  ) {}

  ngOnInit() {
    this.searchformm = this.fb.group({
      coursecategory: ["", [Validators.required]],
      location: ["", [Validators.required]],
    });
    this.homeDataSubscribe = this.generalService.homeData().subscribe((res) => {
      this.newCourses = res[0];
      this.topRatedCourses = res[1];
      this.topRatedInst = res[2];
    });
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

  //hide indecators on small and extra small screen
  onWindowResize(event) {
    this.width = event.target.innerWidth;
    if (this.width < 767) {
      this.showIndicators = false;
    } else {
      this.showIndicators = true;
    }
  }
}
