import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ViewChild,
  Inject,
} from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { CourseService } from "src/app/services/course.service";
import {
  StripeService,
  // Elements,
  // Element as StripeElement,
  // ElementsOptions,
} from "ngx-stripe";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
@Component({
  selector: "app-stripecard-dialog",
  templateUrl: "./stripecard-dialog.component.html",
  styleUrls: ["./stripecard-dialog.component.scss"],
})
export class StripecardDialogComponent implements OnInit, AfterViewInit {
  // @Input() amount: number;
  // amount = 1;
  // @Input() label: string;

  // elements: any;
  // paymentRequest: any;
  // prButton: any;
  // @ViewChild("payElement", { static: false }) payElement;
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  elements: any;
  // card: StripeElement;
  card: any;
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private stripeService: StripeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log(this.data);
    this.stripeService.elements({ locale: "en" }).subscribe((elements) => {
      this.elements = elements;
      // Only mount the element the first time
      // if (!this.card) {
      this.card = this.elements.create("card", {
        style: {
          base: {
            iconColor: "#666EE8",
            color: "#31325F",
            lineHeight: "40px",
            fontWeight: 300,
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSize: "18px",
            "::placeholder": {
              color: "#CFD7E0",
            },
          },
        },
      });
      this.card.mount("#card-element");
      // }
    });
  }

  ngAfterViewInit() {
    //   // 1. instantiate payment request object
    //   this.paymentRequest = this.courseService.stripe.paymentRequest({
    //     country: "US",
    //     currency: "usd",
    //     total: {
    //       amount: this.amount,
    //       label: "Learn Git art and GitHub Art",
    //     },
    //   });
    //   // 2. intialize elements
    //   this.elements = this.courseService.stripe.elements();
    //   // 3. register listner
    //   this.paymentRequest.on("source", async (event) => {
    //     console.log(event);
    //     // fire when user submit their card
    //     // make an http call to charge on the backend
    //     setTimeout(() => {
    //       event.compelete("success");
    //     }, 1000);
    //   });
    //   // 4. create the button
    //   this.prButton = this.elements.create("paymentRequestButton", {
    //     paymentRequest: this.paymentRequest,
    //     style: {
    //       paymentRequestButton: {
    //         type: "buy",
    //         theme: "dark",
    //       },
    //     },
    //   });
    //   // 5. mount the button asynchronosly
    //   this.mountButton();
    // }
    // // to see if the browser support api
    // async mountButton() {
    //   const result = await this.paymentRequest.canMakePayment();
    //   if (result) {
    //     this.prButton.mount(this.payElement.nativeElement);
    //   } else {
    //     console.log("your browser is oooold");
    //   }
  }

  buy() {
    this.stripeService.createToken(this.card, this.data).subscribe((obj) => {
      if (obj) {
        console.log("Token is --> ", obj);

        this.courseService
          .bookCourse({
            token: obj.token.id,
            course: this.data.course,
            user: this.data.user,
          })
          .subscribe(
            (res) => {
              console.log("The response from server is ", res);
              console.log("Payment Done");
            },
            (err) => {
              console.log("The error is ", err);
            }
          );
      } else {
        // Error creating the token
        console.log("Error comes ");
      }
    });
  }
}
