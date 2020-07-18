import { CourseService } from "src/app/services/course.service";
import { UserService } from "./../../../services/user.service";
import { AuthService } from "./../../../services/auth.service";
import { Component, OnInit, Renderer2, ElementRef } from "@angular/core";
import * as $ from "jquery";
import { NgxSmartModalService } from "ngx-smart-modal";
// import {SocialUser ,SocialAuthService, FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from "rxjs";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  //open and close top navbar
  firstNavbarOpen = false;
  //open and close bottom navbar
  secondNavbarOpen = false;
  // register submitted
  submitted = false;
  submittedLogin = false;
  registerform: FormGroup;
  searchform: FormGroup;
  loginform: FormGroup;
  private _opened: boolean = false;
  register = false;
  loginbtn = true;
  isLoggedIn: boolean;
  serverErrorMessages: string;
  userData;
  allFavoCourse = [];
  Categories = [
    "photography",
    "music",
    "cooking",
    "it & software",
    "art",
    "drawing",
    "other",
  ];
  isShow = false;

  // // social login variables
  // userSocial:SocialUser;
  // socialIsLoggedIn:boolean;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public ngxSmartModalService: NgxSmartModalService,
    private userServices: UserService,
    private router: Router,
    private courseService: CourseService // private authSocialService: SocialAuthService
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
        this.userServices.allFavouriteCourses = this.userData.favouriteCourses;
      });
    }
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    // this.authSocialService.authState.subscribe((user)=>{
    //   this.userSocial=user;
    //   this.socialIsLoggedIn = (user != null);
    //   console.log(this.userSocial);
    // })
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  // showItem(item) {
  //   switch (item) {
  //     case "showLogin":
  //       event.stopPropagation();
  //       this.loginbtn = true;
  //       this.register = false;
  //       break;
  //     case "showRegister":
  //       event.stopPropagation();
  //       this.loginbtn = false;
  //       this.register = true;
  //       break;
  //     default:
  //       event.stopPropagation();
  //       this.loginbtn = true;
  //       this.register = false;
  //       break;
  //   }
  // }
  registerFormShow() {
    event.stopPropagation();
    if (this.register == true) {
    } else {
      this.register = !this.register;
      this.loginbtn = !this.loginbtn;
    }
  }

  loginFormShow() {
    event.stopPropagation();
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
    this.isLoggedIn = false;
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
    }
  }
  // to login
  loginSubmit() {
    this.submittedLogin = true;
    this.isLoggedIn = false;
    if (this.loginform.invalid) {
      return false;
    } else {
      this.authService.loginUser(this.loginform.value).subscribe(
        (res) => {
          this.authService.setToken(res["token"]);
          this.loginform.reset();
          this.userServices.getUser().subscribe((res) => {
            this.userData = res["user"];
            if (
              this.userData.fullname == "" &&
              this.userData.gender == "" &&
              this.userData.country == "" &&
              this.userData.city == ""
            ) {
              this.router.navigateByUrl("/edit");
            } else {
              this.router.navigateByUrl("/home");
            }
          });
        },
        (err) => {
          this.serverErrorMessages = err.error.message;
        }
      );
    }
  }

  // signInWithGoogle(): void {
  //   this.authSocialService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  // signInWithFB(): void {
  //   this.authSocialService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }

  // signOut(): void {
  //   this.authSocialService.signOut();
  // }
  userLogout() {
    this.authService.deleteToken();
    this.router.navigate(["/home"]);
    this.isLoggedIn = true;
  }

  instructorLink() {
    this.userServices.getUser().subscribe((res) => {
      this.userData = res["user"];
      if ("instructor" in this.userData) {
        this.router.navigateByUrl("/instcontrol");
      } else {
        this.router.navigateByUrl("/createinst");
      }
    });
  }
  searchCourse() {
    this.router.navigate(["/search", this.searchform.get("searchInput").value]);
  }
}
