import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Injectable()
export class AuthenticationResolver implements Resolve<any> {
	constructor(private authenticationService: AuthenticationService) { }

	resolve(): Observable<any> {
		return of(true);
		// return this.authenticationService.checkAuthentication();
	}
}
