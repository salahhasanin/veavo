import { environment } from "./../../environments/environment";
import { User } from "./../models/user.model";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // selectedUser:User={
  //   _id:  ,
  //   email ?: '',
  //   password ?: '',
  //   username ?: '',
  //   name ?: '',
  //   image ?: '',
  //   favouriteCourses?: number[];
  //   bookedCourses?: number[];
  //   phone?: '',
  //   bithday: Date;
  //   gender?: '',
  //   country?: '',
  //   city?: '',
  //   follows?: number[];
  //   instructor?: number;
  // }

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: "True" }) };
  constructor(private http: HttpClient, private router: Router) {}

  registerUser(email, password) {
    const registerUser = {
      // username: username,
      email: email,
      password: password,
      // name: name,
    };
    return this.http.post(
      environment.authBaseUrl + "/register",
      registerUser,
      this.noAuthHeader
    );
  }

  loginUser(authCredentials) {
    const userdate = {
      email: authCredentials.emailLogin,
      password: authCredentials.passwordLogin,
    };
    return this.http.post(
      environment.authBaseUrl + "/login",
      userdate,
      this.noAuthHeader
    );
  }

  //save jwt token in browser
  setToken(token: string) {
    localStorage.setItem("token", token);
  }
  //get jwt token from browser
  getToken() {
    return localStorage.getItem("token");
  }
  //delete jwt token from browser
  deleteToken() {
    localStorage.removeItem("token");
  }
  //get user info from token=>payload in browser
  getUserPayload() {
    var token = this.getToken();
    if (token) {
      //atob() decode encoded data =>return token 3 item based on . and get second item [1]
      var userPayload = atob(token.split(".")[1]);
      return JSON.parse(userPayload);
    } else return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) return userPayload.exp > Date.now() / 1000;
    else return false;
  }
}
