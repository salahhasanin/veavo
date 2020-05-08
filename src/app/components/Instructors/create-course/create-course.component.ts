import { InstructorService } from "./../../../services/instructor.service";
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-create-course",
  templateUrl: "./create-course.component.html",
  styleUrls: ["./create-course.component.scss"],
})
export class CreateCourseComponent implements OnInit {
  instructorform: FormGroup;
  submitted = false;
  more: boolean = false;
  Month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  Day = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
  ];
  Year = [
    "1960",
    "1961",
    "1962",
    "1963",
    "1964",
    "1965",
    "1966",
    "1967",
    "1968",
    "1969",
    "1970",
    "1971",
    "1972",
    "1973",
    "1974",
    "1975",
    "1976",
    "1977",
    "1978",
    "1979",
    "1980",
    "1981",
    "1982",
    "1983",
    "1984",
    "1985",
    "1986",
    "1987",
    "1988",
    "1989",
    "1990",
    "1991",
    "1992",
    "1993",
    "1994",
    "1995",
    "1996",
    "1997",
    "1998",
    "1999",
    "2000",
  ];
  Governorates = [
    "Alexandria",
    "Aswan",
    "Asyut",
    "Beheira",
    "Beni Suef",
    "Cairo",
    "Dakahlia",
    "Damietta",
    "Faiyum",
    "Gharbia",
    "Giza",
    "Ismailia",
    "Kafr El Sheikh",
    "Luxor",
    "Matruh",
    "Minya",
    "Monufia",
    "New Valley",
    "	North Sinai",
    "	Port Said",
    "	Qalyubia",
    "Qena",
    "Red Sea",
    "Sharqia",
    "Sohag",
    "South Sinai",
    "Suez",
  ];
  constructor(
    public fb: FormBuilder,
    private instructorservices: InstructorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.instructorform = this.fb.group({
      course_category: ["", [Validators.required]],
      instructor_experience: ["", [Validators.required]],
      made_before: ["false"],
      course_description: ["", [Validators.required, Validators.minLength(50)]],
      course_name: ["", [Validators.required, Validators.minLength(10)]],
      // link_course_before: [""],
      // place_course_before: [""],
      course_reason: ["", [Validators.required, Validators.minLength(150)]],
      acceptance_num: [
        "",
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      course_price: [
        "",
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      course_duration: ["", [Validators.required]],
      instructor_name: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/),
        ],
      ],
      instructor_phone: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
        ],
      ],
      instructor_email: [
        "",
        [
          Validators.required,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        ],
      ],
      instructor_college: ["", [Validators.required]],
      instructor_eduction: ["", [Validators.required]],
      instructor_goverorate: ["", [Validators.required]],

      /////////////////////////////
      birthday: ["", [Validators.required]],
      // instructor_birthdate_year: ["", [Validators.required]],
      // instructor_birthdate_day: ["", [Validators.required]],
      // instructor_birthdate_month: ["", [Validators.required]],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.instructorform.invalid) {
      return false;
    } else {
      this.instructorservices
        .addInst(this.instructorform.value)
        .subscribe((res) => {
          console.log(res);
        });
      this.instructorform.reset();
      // this.toastr.success('success!', 'your data added successfuly!');
      console.log("true");
      this.router.navigateByUrl("/details");
    }
  }

  show1() {
    if (this.more == true) {
    } else {
      this.more = !this.more;
    }
    const validators = [Validators.required];
    this.instructorform.addControl(
      "place_course_before",
      new FormControl("", validators)
    );
    this.instructorform.addControl(
      "link_course_before",
      new FormControl("", validators)
    );
    // this.instructorform.get('courselink').setValidators(Validators.required);
  }
  hide2() {
    if (this.more == false) {
    } else {
      this.more = !this.more;
    }
    this.instructorform.removeControl("place_course_before");
    this.instructorform.removeControl("link_course_before");
    //this.instructorform.get('courselink').clearValidators();
  }
}
