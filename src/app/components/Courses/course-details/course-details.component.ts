import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-course-details",
  templateUrl: "./course-details.component.html",
  styleUrls: ["./course-details.component.scss"],
})
export class CourseDetailsComponent implements OnInit {
  fourite = [];
  indexs;
  productItem;
  constructor() {}

  ngOnInit() {}

  y = [
    {
      id: 1,
      title: "Course Title Goes Here",
      description: "Jose Portila",
      buttonText: "30% Off",
      anotherDiscount: "30.70 LE",
      Discount: "20.70 LE",
      img: "../../../assets/home/cardIMG.png",
      category: "IT",
      location: "cairo",
      coursRegistration: 10,
    },
    {
      id: 99,
      title: "Course Title Goes Here",
      description: "Jose Portila",
      buttonText: "30% Off",
      anotherDiscount: "30.70 LE",
      Discount: "20.70 LE",
      img: "../../../assets/home/cardIMG.png",
      category: "IT",
      location: "cairo",
      coursRegistration: 20,
    },
    {
      id: 4,
      title: "Course Title Goes Here",
      description: "Jose Portila",
      buttonText: "30% Off",
      anotherDiscount: "30.70 LE",
      Discount: "20.70 LE",
      img: "../../../assets/home/cardIMG.png",
      category: "IT",
      location: "cairo",
      coursRegistration: 40,
    },
    {
      id: 7,
      title: "Course Title Goes Here",
      description: "Jose Portila",
      buttonText: "30% Off",
      anotherDiscount: "30.70 LE",
      Discount: "20.70 LE",
      img: "../../../assets/home/cardIMG.png",
      category: "IT",
      location: "cairo",
      coursRegistration: 70,
    },
  ];
  intro = [
    {
      id: 1,
      img1: "../../../../assets/details/salahxs.jpg",
      img2: "../../../assets/details/salahxs.jpg",
      img3: "../../../assets/details/salahxs.jpg",
      img4: "../../../assets/details/salahxs.jpg",
      video: "../../../assets/details/salahxl.jpg",
      instructor: "john said",
      coursename: "Course Name",
      courseDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, illum facilis quaerat ullam maxime itaque deserunt temporibus perspiciatis repudiandae hic! Voluptatibus molestias illum adipisci veritatis,iusto tempore temporibus. Modi cupiditate beatae et repellendus quidem. Quisquam aliquam doloribus laboriosam magni quis blanditiis, iste quos ipsam necessitatibus et amet placeat unde inventore illum ea corrupti teneturassumenda sit vel recusandae! Laboriosam voluptates aspernatur nostrum quia obcaecati ullam asperiores tempora unde, nesciunt veniam impedit amet provident accusamus magnam, modi officia quas. Cupiditate neque quam essedolorum voluptates ex nemo ab! Dolores modi quia dolor eligendi alias a ducimus, aliquam quam recusandae nostrum earum sit, quisquam voluptas! Iusto, ullam. Vero a, laudantium molestias culpa odio magnam ad necessitatibus!Labore dolores, commodi ab quas ipsa, asperiores perferendis ullam repellat non ipsam dolorem id molestiaequasi illum molestias. Doloremque ipsa ex eligendi itaque et? Quaerat ipsum quisquam quidem dicta nostrum",
      previousSalary: "AED 32.00",
      Salary: "AED 52.60",
      courseSale: "30% of",
    },
  ];

  learn = [
    "odfhknjvn iefvuibn ucewidv we0fvoivoiun uhfcijuvh uinjbvu dhm uhsfgdbc lnfuvbsdfco jsdvjv ",
    "odfhknjvn iefvuibn ucewidv we0fvoivoiun uhfcijuvh uinjbvu dhm uhsfgdbc sdn ju noidc nicoicnufc n odivjijo v ioinv niv ic",
    "odfhknjvn iefvuibn ucewidv we0fvoivoiun uhfcijuvh uinjbvu dhm uhsfgdbc inv kci okv noi m ii",
    "odfhknjvn iefvuibn ucewidv we0fvoivoiun uhfcijuvh uinjbvu dhm uhsfgdbc",
    "odfhknjvn iefvuibn ucewidv we0fvoivoiun uhfcijuvh uinjbvu dhm uhsfgdbc",
  ];

  review = [
    {
      date: "5 septemper 2018",
      imge: "../../../assets/home/Path9-1.png",
      name: "john willim",
      reviewBody:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et expedita labore voluptates facilis nisi, quisquam ipsam eaque, animi, fugiat aspernatur vel suscipit quaerat praesentium a quidem impedit dicta numquam ipsum",
    },
    {
      date: "5 septemper 2018",
      imge: "../../../assets/home/Path9-1.png",
      name: "john willim",
      reviewBody:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et expedita labore voluptates facilis nisi, quisquam ipsam eaque, animi, fugiat aspernatur vel suscipit quaerat praesentium a quidem impedit dicta numquam ipsum",
    },
    {
      date: "5 septemper 2018",
      imge: "../../../assets/home/Path9-1.png",
      name: "john willim",
      reviewBody:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et expedita labore voluptates facilis nisi, quisquam ipsam eaque, animi, fugiat aspernatur vel suscipit quaerat praesentium a quidem impedit dicta numquam ipsum",
    },
  ];

  mainCourseAddFavourite(id) {
    if (this.fourite.indexOf(id) !== -1) {
      this.productItem = this.fourite.indexOf(id);
      this.fourite.splice(this.productItem, 1);
    } else {
      this.fourite.push(id);
    }
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
