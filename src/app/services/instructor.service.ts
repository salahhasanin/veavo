import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class InstructorService {
  constructor(private http: HttpClient) {}
  addInst(instructorData) {
    return this.http.post(environment.instBaseUrl + "/newinst", instructorData);
  }
}
