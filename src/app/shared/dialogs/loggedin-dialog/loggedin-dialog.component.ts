import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-loggedin-dialog",
  templateUrl: "./loggedin-dialog.component.html",
  styleUrls: ["./loggedin-dialog.component.scss"],
})
export class LoggedinDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}
}
