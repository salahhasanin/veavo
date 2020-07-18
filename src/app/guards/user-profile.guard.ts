import { UserService } from "./../services/user.service";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserProfileGuard implements CanActivate {
  userData;
  constructor(private userService: UserService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService.getUser().pipe(
      map((res) => {
        this.userData = res;
        if (
          !("fullName" in this.userData.user) &&
          !("gender" in this.userData.user) &&
          !("country" in this.userData.user) &&
          !("city" in this.userData.user)
        ) {
          this.router.navigate(["/edit"], {
            queryParams: {
              return: state.url,
            },
          });
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
