import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class GeneralService {
  constructor(private http: HttpClient) {}

  homeData() {
    return this.http.get(environment.courseBaseUrl + "/homepage");
  }
}
