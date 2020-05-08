import { UserService } from "./../../../services/user.service";
import { AuthService } from "./../../../services/auth.service";
import { Component, OnInit, Renderer2, ElementRef } from "@angular/core";
import * as $ from "jquery";
import { NgxSmartModalService } from "ngx-smart-modal";

import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  registerform: FormGroup;
  searchform: FormGroup;
  loginform: FormGroup;
  private _opened: boolean = false;
  register: boolean = false;
  loginbtn: boolean = true;
  //open and close top navbar
  firstNavbarOpen = false;
  //open and close bottom navbar
  secondNavbarOpen = false;
  // register submitted
  submitted = false;
  submittedLogin = false;
  isLoggedIn: boolean;
  serverErrorMessages: string;
  userData;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public ngxSmartModalService: NgxSmartModalService,
    private userServices: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    //active class for login and register buttons
    $(document).ready(function () {
      $("button.registerButton").click(function () {
        $("button.loginButton").removeClass("active");
        $("button.registerButton").addClass("active");
      });
    });
    // registration form
    this.registerform = this.fb.group({
      emailRegister: [
        "",
        [
          Validators.required,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        ],
      ],
      passwordRegister: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(11),
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/),
        ],
      ],
    });
    // loginform
    this.loginform = this.fb.group({
      emailLogin: [
        "",
        [
          Validators.required,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        ],
      ],
      passwordLogin: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(11),
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/),
        ],
      ],
    });
    // search form
    this.searchform = this.fb.group({
      searchInput: ["", [Validators.required]],
    });

    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = false;
      this.userServices.getUser().subscribe((res) => {
        this.userData = res["user"];
        console.log(this.userData);
      });
    } else {
      this.isLoggedIn = true;
    }
    console.log(this.authService.isLoggedIn());
  }
  isShow = false;

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  registerFormShow() {
    if (this.register == true) {
    } else {
      this.register = !this.register;
      this.loginbtn = !this.loginbtn;
    }
  }

  loginFormShow() {
    if (this.loginbtn == true) {
    } else {
      this.loginbtn = !this.loginbtn;
      this.register = !this.register;
    }
  }
  // to open and close top navbar
  topToggleNavbar() {
    this.firstNavbarOpen = !this.firstNavbarOpen;
  }
  // to open and close top navbar
  bottomToggleNavbar() {
    this.secondNavbarOpen = !this.secondNavbarOpen;
  }
  // to make register first time
  registerSubmit() {
    this.submitted = true;
    if (this.registerform.invalid) {
      return false;
    } else {
      this.authService
        .registerUser(
          this.registerform.get("emailRegister").value,
          this.registerform.get("passwordRegister").value
        )
        .subscribe((res) => {
          this.authService.setToken(res["token"]);
          this.registerform.reset();
          this.router.navigateByUrl("/edit");
        });
      // console.log(
      //   this.registerform.get("emailRegister").value,
      //   this.registerform.get("passwordRegister").value
      // );
      // this.isLoggedIn = false;
    }
  }
  // to login
  loginSubmit() {
    this.submittedLogin = true;
    if (this.loginform.invalid) {
      return false;
    } else {
      this.authService.loginUser(this.loginform.value).subscribe(
        (res) => {
          this.authService.setToken(res["token"]);
          this.loginform.reset();
          this.router.navigateByUrl("/edit");
        },
        (err) => {
          this.serverErrorMessages = err.error.message;
        }
      );
    }
  }
  userLogout() {
    this.authService.deleteToken();
    this.router.navigate(["/home"]);
  }
}
