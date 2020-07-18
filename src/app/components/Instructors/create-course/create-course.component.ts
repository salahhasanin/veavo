import { UserService } from "./../../../services/user.service";
import { InstructorService } from "./../../../services/instructor.service";
import { Component, OnInit } from "@angular/core";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
// import { Ng2ImgMaxService } from "ng2-img-max";

import {
  FormGroup,
  FormArray,
  FormBuilder,
  AbstractControl,
  Validators,
} from "@angular/forms";
import * as $ from "jquery";

import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { CourseService } from "src/app/services/course.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-create-course",
  templateUrl: "./create-course.component.html",
  styleUrls: ["./create-course.component.scss"],
})
export class CreateCourseComponent implements OnInit {
  userData;
  submitted = false;
  savedCourse;
  courseData;
  // videoSrc;
  uploadedImage: Blob;
  courseForm: FormGroup;
  Categories = [
    "photography",
    "music",
    "cooking",
    "it & software",
    "art",
    "drawing",
    "other",
  ];
  constructor(
    private instructorservices: InstructorService,
    private router: Router,
    public fb: FormBuilder,
    private authService: AuthService,
    private courseService: CourseService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.courseForm = this.fb.group({
      courseImage: ["", [Validators.required]],
      // courseVideo: [null],
      courseName: [
        "",
        [
          Validators.required,
          Validators.maxLength(200),
          Validators.minLength(2),
          Validators.pattern(/^[a-zA-Z0-9.,?!؟=*/+()`~{}&%$#@:;"،-\s]+$/),
        ],
      ],
      coursePlace: [
        "",
        [
          Validators.required,
          Validators.maxLength(200),
          Validators.minLength(2),
          Validators.pattern(/^[a-zA-Z0-9.,?!؟=*/+()`~{}&%$#@:;"،-\s]+$/),
        ],
      ],
      description: [
        "",
        [
          Validators.required,
          Validators.maxLength(946),
          Validators.minLength(778),
          Validators.pattern(/^[a-zA-Z0-9.,?!؟=*/+()`~{}&%$#@:;"،-\s]+$/),
        ],
      ],
      courseCategory: ["", [Validators.required]],
      previousSalary: ["", [Validators.pattern(/[0-9]/)]],
      salary: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
      startDate: ["", [Validators.required]],
      attendanceNumber: [
        "",
        [Validators.required, Validators.pattern(/[0-9]/)],
      ],
      timesInWeek: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
      numOfMaterial: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
      exercise: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
      certificate: ["true", [Validators.required]],
      learnPoints: this.fb.array([this.fb.control(null)]), //required,letter and number only,
      prerequists: this.fb.array([this.fb.control(null)]), //required,letter and number only,
    });
  }

  readURL(input, selector) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $(selector).css(
          "background-image",
          "url(" + (e.target as FileReader).result + ")"
        );
        $(selector).hide();
        $(selector).fadeIn(100);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  fileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      this.readURL(event.target, "#imagePreview");
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        const file = (event.target as HTMLInputElement).files[0];

        this.courseForm.patchValue({
          courseImage: file,
        });

        reader.onload = (event: any) => {
          const img = new Image();
          img.src = event.target.result as string;
          img.onload = () => {
            const height = img.naturalHeight;
            const width = img.naturalWidth;
          };
          console.log("ADDed");
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  // videoChanged(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     this.readURL(event.target, "#videoPreview");
  //     var filesAmount = event.target.files.length;
  //     for (let i = 0; i < filesAmount; i++) {
  //       var reader = new FileReader();

  //       const file = (event.target as HTMLInputElement).files[0];
  //       this.courseForm.patchValue({
  //         courseVideo: file,
  //       });

  //       reader.onload = (event: any) => {
  //         console.log("ADDed");
  //         this.videoSrc = event.target.result;
  //         //   debugger;
  //         //   console.log(this.field.templateOptions.nextFields);
  //       };
  //       reader.readAsDataURL(event.target.files[i]);
  //     }
  //   }
  // }

  addLearnPoint() {
    (this.courseForm.get("learnPoints") as FormArray).push(
      this.fb.control(null)
    );
  }

  removeLearnPoint(index) {
    (this.courseForm.get("learnPoints") as FormArray).removeAt(index);
  }

  getLearnPointFormControls(): AbstractControl[] {
    return (<FormArray>this.courseForm.get("learnPoints")).controls;
  }

  addPrerequist() {
    (this.courseForm.get("prerequists") as FormArray).push(
      this.fb.control(null)
    );
  }

  removePrerequist(index) {
    (this.courseForm.get("prerequists") as FormArray).removeAt(index);
  }

  getPrerequistFormControls(): AbstractControl[] {
    return (<FormArray>this.courseForm.get("prerequists")).controls;
  }

  courseformSubmit() {
    this.submitted = true;
    if (this.authService.isLoggedIn()) {
      this.userService.getUser().subscribe((res) => {
        this.userData = res["user"];
        this.courseService
          .createNewCourse(
            this.userData._id,
            this.courseForm.value.courseImage,
            // this.courseForm.value.courseVideo,
            this.courseForm.value.courseName,
            this.courseForm.value.coursePlace,
            this.courseForm.value.description,
            this.courseForm.value.courseCategory,
            this.courseForm.value.previousSalary,
            this.courseForm.value.salary,
            this.courseForm.value.startDate,
            this.courseForm.value.attendanceNumber,
            this.courseForm.value.timesInWeek,
            this.courseForm.value.numOfMaterial,
            this.courseForm.value.exercise,
            this.courseForm.value.certificate,
            this.courseForm.value.learnPoints,
            this.courseForm.value.prerequists
          )
          .subscribe((res) => {
            this.savedCourse = res;
            this.router.navigate([
              "/category/",
              this.courseForm.value.courseCategory,
            ]);
            this.courseForm.reset();
          });
      });
    }
  }
}
