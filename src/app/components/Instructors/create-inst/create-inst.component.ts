import { UserService } from "./../../../services/user.service";
import { InstructorService } from "./../../../services/instructor.service";
import { Component, OnInit } from "@angular/core";

import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
import { FormGroup, FormArray } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

export interface StepType {
  label: string;
  fields: FormlyFieldConfig[];
}

@Component({
  selector: "app-create-inst",
  templateUrl: "./create-inst.component.html",
  styleUrls: ["./create-inst.component.scss"],
})
export class CreateInstComponent implements OnInit {
  userData;
  return: string = "";
  constructor(
    private instructorService: InstructorService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe(
      (params) => (this.return = params["return"] || "/instcontrol")
    );
  }
  activedStep = 0;
  model = {};
  steps: StepType[] = [
    {
      label: "Personal data",

      fields: [
        {
          className: "lableStyle",
          key: "jobTitle",
          type: "input",
          templateOptions: {
            attributes: {
              style: "width:50%;margin:0 auto;",
            },
            label: "Your Job Title",
            required: true,
            maxLength: 400,
            minLength: 2,
            pattern: /^[a-zA-Z0-9.,?!؟=*/+()`~{}&%$#@:;"،-\s]+$/,
          },
          validation: {
            messages: {
              pattern: (error, field: FormlyFieldConfig) =>
                `your job title is not a valid it contain symbols`,
            },
          },
        },
        {
          className: "lableStyle",
          key: "description",
          type: "textarea",
          templateOptions: {
            attributes: {
              style: "width:50%;margin:0 auto; height:100px;",
            },
            label: "Instructor Description",
            required: true,
            maxLength: 620,
            minLength: 100,
            pattern: /^[a-zA-Z0-9.,?!؟=*/+()`~{}&%$#@:;"،-\s]+$/,
          },
          validation: {
            messages: {
              pattern: (error, field: FormlyFieldConfig) =>
                `your description is not a valid it contain symbols`,
            },
          },
        },
        {
          className: "col-6 lableStyle",
          key: "facebook",
          type: "input",
          templateOptions: {
            attributes: {
              style: "width:50%;margin:0 auto;",
            },
            label: "Facebook",
            pattern: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
          },
          validation: {
            messages: {
              pattern: (error, field: FormlyFieldConfig) =>
                `"${field.formControl.value}" is not a valid url`,
            },
          },
        },
        {
          className: "col-6 lableStyle",
          key: "twitter",
          type: "input",
          templateOptions: {
            attributes: {
              style: "width:50%;margin:0 auto;",
            },
            label: "Twitter",
            pattern: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
          },
          validation: {
            messages: {
              pattern: (error, field: FormlyFieldConfig) =>
                `"${field.formControl.value}" is not a valid url`,
            },
          },
        },
        {
          className: "col-6 lableStyle",
          key: "linkedin",
          type: "input",
          templateOptions: {
            attributes: {
              style: "width:50%;margin:0 auto;",
            },
            label: "linkedIn",
            pattern: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
          },
          validation: {
            messages: {
              pattern: (error, field: FormlyFieldConfig) =>
                `"${field.formControl.value}" is not a valid url`,
            },
          },
        },
      ],
    },
    {
      label: "Education",
      fields: [
        {
          className: "col-6 lableStyle",
          key: "education",
          type: "input",
          templateOptions: {
            attributes: {
              style: "width:50%;margin:0 auto;",
            },
            label: "Education",
            required: true,
            minLength: 2,
            maxLength: 60,
            pattern: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
          },
          validation: {
            messages: {
              pattern: (error, field: FormlyFieldConfig) =>
                `"${field.formControl.value}" accept letters and numbers only`,
            },
          },
        },
        {
          className: "col-6 lableStyle",
          key: "college",
          type: "input",
          templateOptions: {
            attributes: {
              style: "width:50%;margin:0 auto;",
            },
            label: "College",
            required: true,
            minLength: 2,
            maxLength: 60,
            pattern: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
          },
          validation: {
            messages: {
              pattern: (error, field: FormlyFieldConfig) =>
                `"${field.formControl.value}" accept letters and numbers only`,
            },
          },
        },
        {
          className: "col-6 lableStyle",
          key: "experience",
          type: "input",
          templateOptions: {
            type: "number",
            attributes: {
              style: "width:50%;margin:0 auto;",
            },
            label: "Years Of Experience",
            required: true,
            maxLength: 2,
          },
        },
      ],
    },
  ];

  form = new FormArray(this.steps.map(() => new FormGroup({})));
  options = this.steps.map(() => <FormlyFormOptions>{});

  prevStep(step) {
    this.activedStep = step - 1;
  }

  nextStep(step) {
    this.activedStep = step + 1;
  }

  submit() {
    if (this.authService.isLoggedIn()) {
      this.userService.getUser().subscribe((res) => {
        this.userData = res["user"];

        if (this.form.valid) {
          // console.log("valid");
          this.instructorService
            .addInst(this.userData._id, this.model)
            .subscribe((res) => {
              // console.log(res);
            });
          this.router.navigateByUrl(this.return);
        }
      });
    }
  }
}
