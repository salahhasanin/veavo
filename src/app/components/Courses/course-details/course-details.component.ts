import { UserService } from "./../../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { CourseService } from "src/app/services/course.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Course } from "src/app/shared/models/course.model";
import { decode } from "punycode";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-course-details",
  templateUrl: "./course-details.component.html",
  styleUrls: ["./course-details.component.scss"],
})
export class CourseDetailsComponent implements OnInit {
  fourite = [];
  indexs: any;
  productItem: any;
  coursId: any;
  course: any;
  instructorDetails: any;
  relatedCourses: any;
  userDetails: any;
  learnPoint = true;
  prerequists = false;
  comments = false;
  instructor = false;
  related = false;
  userData: any;
  courset: Course;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.coursId = this.route.snapshot.paramMap.get("courseId");
    // this.coursId = decode(this.coursIdbeforeDecoded);
    // this.coursId = this.courseService.accessCourseId;
    // this.courseService.courseIdEmitter.subscribe((msg) => {
    //   this.coursId = msg;
    // });

    this.courseService.getCourse(this.coursId).subscribe((res) => {
      this.course = res[0];
      this.instructorDetails = res[1];
      this.userDetails = res[2];
      this.relatedCourses = res[3];
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

  // mainCourseAddFavourite(id) {
  //   if (this.fourite.indexOf(id) !== -1) {
  //     this.productItem = this.fourite.indexOf(id);
  //     this.fourite.splice(this.productItem, 1);
  //     this.userService
  //       .removeFavouritCourse(this.userData._id, id)
  //       .subscribe((res) => {
  //         console.log(res);
  //       });
  //   } else {
  //     this.fourite.push(id);
  //     this.userService
  //       .addFavouritCourse(this.userData._id, id)
  //       .subscribe((res) => {
  //         console.log(res);
  //       });
  //   }
  // }
  addFavourite(id, index) {
    this.indexs = index;
    if (this.fourite.indexOf(id) !== -1) {
      this.productItem = this.fourite.indexOf(id);
      this.fourite.splice(this.productItem, 1);
    } else {
      this.fourite.push(id);
    }
  }

  showItem(item) {
    switch (item) {
      case "learnPoint":
        this.learnPoint = true;
        this.prerequists = false;
        this.comments = false;
        this.instructor = false;
        this.related = false;
        break;
      case "prerequists":
        this.learnPoint = false;
        this.prerequists = true;
        this.comments = false;
        this.instructor = false;
        this.related = false;
        break;
      case "comments":
        this.learnPoint = false;
        this.prerequists = false;
        this.comments = true;
        this.instructor = false;
        this.related = false;
        break;
      case "instructor":
        this.learnPoint = false;
        this.prerequists = false;
        this.comments = false;
        this.instructor = true;
        this.related = false;
        break;
      case "related":
        this.learnPoint = false;
        this.prerequists = false;
        this.comments = false;
        this.instructor = false;
        this.related = true;
        break;
      default:
        this.learnPoint = true;
        this.prerequists = false;
        this.comments = false;
        this.instructor = false;
        this.related = false;
        break;
    }
  }

  onToggleFavorite(favorited: boolean) {
    // this.courset.favorited = favorited;
    console.log(favorited);
    // if (favorited) {
    //   this.article.favoritesCount++;
    // } else {
    //   this.article.favoritesCount--;
    // }
  }
  // goToCourseDetails(course_Id) {
  //   this.courseService.accessCourseId = course_Id;
  //   this.router.navigate(["/course/corsedetails"]);
  // }
}
