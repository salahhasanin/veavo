import { environment } from "./../../environments/environment";
import { User } from "./../models/user.model";
import { Router } from "@angular/router";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  updateProfile(
    id,
    image: File,
    fullname: string,
    birthday,
    usergender: string,
    city: string,
    state: string,
    phone
  ) {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("fullname", fullname);
    formData.append("birthday", birthday);
    formData.append("gender", usergender);
    formData.append("country", state);
    formData.append("city", city);
    formData.append("phone", phone);
    console.log(image);
    const userInfo = {
      image: image,
      phone: phone,
      birthday: birthday,
      fullname: fullname,
      gender: usergender,
      country: state,
      city: city,
    };
    console.log();
    return this.http.post(
      environment.userBaseUrl + "/editprofile" + `/${id}`,
      formData,
      {
        reportProgress: true,
        observe: "events",
      }
    );
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  //get user data
  getUser() {
    return this.http.get(environment.userBaseUrl + "/profile");
  }
}
