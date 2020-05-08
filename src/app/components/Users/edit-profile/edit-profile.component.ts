import { UserService } from "./../../../services/user.service";
import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { HttpEvent, HttpEventType } from "@angular/common/http";
@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"],
})
export class EditProfileComponent implements OnInit {
  profileform: FormGroup;
  submitted = false;
  preview: string;
  percentDone: any = 0;
  constructor(
    public fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    // fullname city state= /^[a-zA-Z\s]*$/
    // birthday= ^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$
    //  phone=     /^01[0-2-5]{1}[0-9]{8}/

    this.profileform = this.fb.group({
      avatar: [null],
      fullname: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(60),
          Validators.pattern(/^[a-zA-Z\s]*$/),
        ],
      ],
      birthday: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
          ),
        ],
      ],
      usergender: ["", [Validators.required]],
      city: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-Z\s]*$/),
        ],
      ],
      state: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-Z\s]*$/),
        ],
      ],
      phone: [
        "",
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern(/^01[0-2-5]{1}[0-9]{8}/),
        ],
      ],
    });

    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $("#imagePreview").css(
            "background-image",
            "url(" + (e.target as FileReader).result + ")"
          );
          $("#imagePreview").hide();
          $("#imagePreview").fadeIn(650);
        };
        reader.readAsDataURL(input.files[0]);
      }
    }

    $("#imageUpload").change(function () {
      readURL(this);
    });
  }
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.profileform.patchValue({
      avatar: file,
    });
    this.profileform.get("avatar").updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  profileformSubmit() {
    this.userService
      .updateProfile(
        "5eb3511d010e4543a49e71c2",
        this.profileform.value.avatar,
        this.profileform.value.fullname,
        this.profileform.value.birthday,
        this.profileform.value.usergender,
        this.profileform.value.city,
        this.profileform.value.state,
        this.profileform.value.phone
      )
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log("Request has been made!");
            break;
          case HttpEventType.ResponseHeader:
            console.log("Response header has been received!");
            break;
          case HttpEventType.UploadProgress:
            this.percentDone = Math.round((event.loaded / event.total) * 100);
            console.log(`Uploaded! ${this.percentDone}%`);
            break;
          case HttpEventType.Response:
            console.log("User successfully created!", event.body);
            this.percentDone = false;
          // this.router.navigate(["users-list"]);
        }
      });

    // console.log(
    //   this.profileform.value.avatar,
    //   this.profileform.value.fullname,
    //   this.profileform.value.birthday,
    //   this.profileform.value.usergender,
    //   this.profileform.value.city,
    //   this.profileform.value.state,
    //   this.profileform.value.phone
    // );
  }
}
