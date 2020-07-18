import { NavbarComponent } from "./navbar.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxSmartModalModule } from "ngx-smart-modal";
import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
} from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    // NgxSmartModalModule.forRoot(),
    // MatSidenavModule,
    // MatToolbarModule,
    // MatIconModule,
    // ReactiveFormsModule
  ],
  exports: [],
})
export class NavbarModuleModule {}
