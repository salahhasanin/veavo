import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./../services/user.service";
import { map } from "rxjs/internal/operators/map";

@Injectable({
  providedIn: "root",
})
export class CreateInstGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  userData;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService.getUser().pipe(
      map((res) => {
        this.userData = res;
        if (!("instructor" in this.userData.user)) {
          this.router.navigate(["/createinst"], {
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
