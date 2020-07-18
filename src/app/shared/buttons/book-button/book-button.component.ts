import { LoggedinDialogComponent } from "./../../dialogs/loggedin-dialog/loggedin-dialog.component";
import { AuthService } from "./../../../services/auth.service";
import { StripecardDialogComponent } from "./../../payment/stripecard-dialog/stripecard-dialog.component";
import { Component, OnInit, Input, Inject } from "@angular/core";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-book-button",
  templateUrl: "./book-button.component.html",
  styleUrls: ["./book-button.component.scss"],
})
export class BookButtonComponent implements OnInit {
  // elements: Elements;

  /////////////////////////////////////////////////
  // elements: any;
  // card: StripeElement;
  // card: any;
  // @Input() coursename: String;
  @Input() course: Object;
  @Input() user: Object;
  ////////////////////////////////////////////////
  // optional parameters
  // elementsOptions: ElementsOptions = {locale: "es"};
  // stripeTest: FormGroup;

  constructor(public dialog: MatDialog, private authService: AuthService) {}

  ngOnInit() {
    // this.stripeService.elements({ locale: "es" }).subscribe((elements) => {
    //   this.elements = elements;
    //   // Only mount the element the first time
    //   if (!this.card) {
    //     this.card = this.elements.create("card", {
    //       style: {
    //         base: {
    //           iconColor: "#666EE8",
    //           color: "#31325F",
    //           lineHeight: "40px",
    //           fontWeight: 300,
    //           fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    //           fontSize: "18px",
    //           "::placeholder": {
    //             color: "#CFD7E0",
    //           },
    //         },
    //       },
    //     });
    //     this.card.mount("#card-element");
    //   }
    // });
  }

  openDialog() {
    if (this.authService.isLoggedIn()) {
      this.dialog.open(StripecardDialogComponent, {
        width: "460px",
        height: "350px",
        data: {
          // coursename: this.coursename,
          course: this.course,
          user: this.user,
        },
      });
    } else {
      this.dialog.open(LoggedinDialogComponent, {
        width: "300px",
        height: "200px",
        data: {
          message: "Please Login First",
        },
      });
    }
  }
  // buy() {
  //   this.stripeService
  //     .createToken(this.card, { coursename: this.coursename })
  //     .subscribe((obj) => {
  //       if (obj) {
  //         console.log("Token is --> ", obj.token.id);

  //         this.courseService.bookCourse({ token: obj.token.id }).subscribe(
  //           (res) => {
  //             console.log("The response from server is ", res);
  //             console.log("Payment Done");
  //           },
  //           (err) => {
  //             console.log("The error is ", err);
  //           }
  //         );
  //       } else {
  //         // Error creating the token
  //         console.log("Error comes ");
  //       }
  //     });
  // }
}
