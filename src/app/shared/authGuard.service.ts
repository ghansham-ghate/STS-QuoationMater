import {Injectable} from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './AuthService.service';
@Injectable()
export class AuthGuard implements CanActivate {
    


  constructor( private router: Router , private authservice:AuthService) {
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authservice.isAuthenticated()) {
      
        return true;
    }
        return false;
  }

 
}
