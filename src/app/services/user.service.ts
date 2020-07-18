import { environment } from "./../../environments/environment";
import { User } from "./../models/user.model";
import { Router } from "@angular/router";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  allFavouriteCourses = [];
  userData;
  constructor(private http: HttpClient, private router: Router) {}
  // update user profile
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
  loginUserData() {
    this.http.get(environment.userBaseUrl + "/profile").subscribe((res) => {
      this.userData = res["user"];
      return this.userData;
    });
  }
  //rating function
  rateCourse(userID, courseID, rateValue) {
    const ratedoc = {
      userId: userID,
      courseId: courseID,
      rate: rateValue,
    };
    return this.http.post(environment.userBaseUrl + "/ratecourse", ratedoc);
  }
  // remove course in my favourite list
  removeFavouritCourse(id, courseId) {
    const course = {
      courseId: courseId,
    };
    // console.log(id);
    console.log(course);
    return this.http.post(
      environment.userBaseUrl + "/removefavouritcourse" + `/${id}`,
      course
    );
  }
  // add course in my favourite list
  addFavouritCourse(id, courseId) {
    const course = {
      courseId: courseId,
    };
    return this.http.post(
      environment.userBaseUrl + "/addfavouritcourse" + `/${id}`,
      course
    );
  }
  // get all courses in my favourite list
  getUserFavouritCourses(id) {
    return this.http.get(
      environment.userBaseUrl + "/favouritcourses" + `/${id}`
    );
  }
  // follow instructor
  followInstructor(userId, instId) {
    const IDs = {
      userId: userId,
      instId: instId,
    };
    return this.http.post(environment.userBaseUrl + "/followInst", IDs);
  }
  // unFollow instructor
  unFollowInstructor(userId, instId) {
    const IDs = {
      userId: userId,
      instId: instId,
    };
    return this.http.post(environment.userBaseUrl + "/unFollowInst", IDs);
  }
  getAllFollowingInst(id) {
    return this.http.get(environment.userBaseUrl + "/followingInst" + `/${id}`);
  }
}
