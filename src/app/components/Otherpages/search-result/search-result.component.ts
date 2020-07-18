import { CourseService } from "src/app/services/course.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-search-result",
  templateUrl: "./search-result.component.html",
  styleUrls: ["./search-result.component.scss"],
})
export class SearchResultComponent implements OnInit {
  searchResult: any;
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.getSearchResults();
  }
  getSearchResults() {
    if (this.route.snapshot.paramMap.get("searchvalue")) {
      this.courseService
        .searchForCourse(this.route.snapshot.paramMap.get("searchvalue"))
        .subscribe((res) => {
          this.searchResult = res;
          console.log(this.searchResult);
        });
    }
  }
}
