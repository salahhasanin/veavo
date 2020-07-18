import { Course } from "src/app/shared/models/course.model";
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { environment } from "../../environments/environment";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CourseService {
  // private courseId;
  // courseIdEmitter = new Subject<Number>();
  stripe = Stripe(environment.stripePublish_key);
  private header = new HttpHeaders({ "content-type": "application/json" });
  constructor(private http: HttpClient) {}
  //tosend courseId in route using service
  // set accessCourseId(courseId) {
  //   this.courseId = courseId;
  // }

  // get accessCourseId() {
  //   return this.courseId;
  // }

  createNewCourse(
    id,
    courseImage: File,
    // courseVideo: File,
    courseName: string,
    coursePlace: string,
    description: string,
    courseCategory: string,
    previousSalary,
    salary,
    startDate,
    attendanceNumber,
    timesInWeek,
    numOfMaterial,
    exercise,
    certificate,
    learnPoints,
    prerequists
  ) {
    var formData = new FormData();

    formData.append("courseImage", courseImage);
    // formData.append("courseVideo", courseVideo);
    formData.append("courseName", courseName);
    formData.append("courseDescription", description);
    formData.append("priviousSalary", previousSalary);
    formData.append("salary", salary);
    formData.append("coursePlace", coursePlace);
    formData.append("courseStart", startDate);
    formData.append("attendanceNum", attendanceNumber);
    formData.append("category", courseCategory);
    formData.append("timesInWeek", timesInWeek);
    formData.append("numOfMaterial", numOfMaterial);
    formData.append("exercise", exercise);
    formData.append("certificate", certificate);
    formData.append("learnPoint", JSON.stringify(learnPoints));
    formData.append("prerequists", JSON.stringify(prerequists));

    return this.http.post(
      environment.courseBaseUrl + "/newcourse" + `/${id}`,
      formData,
      {
        reportProgress: true,
        observe: "events",
      }
    );
  }
  // getCoursesCategory(category): Observable<Course[]> {
  //   return this.http.get<Course[]>(
  //     environment.courseBaseUrl + "/categorycourses/" + `${category}`
  //   );
  // }
  getCoursesCategory(category) {
    return this.http.get(
      environment.courseBaseUrl + "/categorycourses/" + `${category}`
    );
  }
  getCourse(id) {
    return this.http.get(environment.courseBaseUrl + "/getcourse" + `/${id}`);
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

  searchForCourse(courseName) {
    return this.http.get(
      environment.courseBaseUrl + "/searchcourse" + `/${courseName}`
    );
  }

  bookCourse(paymentData) {
    return this.http.post(
      environment.courseBaseUrl + "/payforcourse",
      paymentData
    );
  }
}
