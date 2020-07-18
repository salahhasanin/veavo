import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { Course } from "../shared/models/course.model";
@Injectable({
  providedIn: "root",
})
export class InstructorService {
  constructor(private http: HttpClient) {}

  addInst(id, instructorData) {
    return this.http.post(
      environment.instBaseUrl + "/newinst" + `/${id}`,
      instructorData
    );
  }

  getInstructorData(id) {
    return this.http.get(
      environment.instBaseUrl + "/instructordata" + `/${id}`
    );
  }

  getInstCourses(id) {
    return this.http.get(environment.instBaseUrl + "/instcourses" + `/${id}`);
  }

  //rating function
  rateInst(userID, instId, rateValue) {
    const ratedoc = {
      userId: userID,
      instId: instId,
      rate: rateValue,
    };
    return this.http.post(environment.instBaseUrl + "/rateinst", ratedoc);
  }
}
