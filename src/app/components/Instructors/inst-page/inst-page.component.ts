import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-inst-page",
  templateUrl: "./inst-page.component.html",
  styleUrls: ["./inst-page.component.scss"],
})
export class InstPageComponent implements OnInit {
  totalRate = 1;
  fourite = [];
  indexs;
  productItem;
  constructor() {}

  ngOnInit() {}
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
}
