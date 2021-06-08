import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router
} from '@angular/router';

import { AuthenticationService } from 'src/app/authentication/authentication.service';

import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class AuthGuard implements CanActivate {

	constructor(private router: Router, private authenticationService: AuthenticationService) { }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): boolean {
		if (this.authenticationService.isAuthenticated) {
			return true;
		} else {
			this.router.navigate(['/home']);
			return false;
		}
	}
}
